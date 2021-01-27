
/**
 * Message
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        alert('got message')
        console.log('request', request)
    }
);

/**
 * current date functions
 */

 function get_current_date() {
    let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
    return {month, date, year}
 }

/**
 * set default settings for application
 * setting operations
 */


function set_default_settings(migrate) {
    chrome.storage.sync.get(['SETTING'], par_tf => {
        
        if(par_tf && par_tf.SETTING && !migrate) return;
        
        let settings = {
            daily_notification : true,
            hourly_notification: true,
            div_1: true,
            div_2: true,
            div_3: true
        };
        chrome.storage.sync.set({'SETTING': settings}, () => {
            // shut up
        })
    })
}

/**
 * create notification
 */


 function show_notification(title, message, is_daily){ 
     if(!message) return;
    let noti_object = {
        type: 'basic',
        iconUrl: 'icon.png',
        title: title,
        message: message,
        // priority: is_daily? 1 : 2
    }
    chrome.notifications.create('notification', noti_object)

    if(is_daily) chrome.browserAction.setIcon({path:"icon3.png"});
    else chrome.browserAction.setIcon({path:"icon2.png"})

    chrome.notifications.onClicked.addListener(function(notificationId) {
        chrome.browserAction.setIcon({path:"icon.png"});
    });

    chrome.storage.sync.get(['TIME_FRAME'], par_tf => {
        let time_frame = par_tf.TIME_FRAME 
        // console.log('tf got', is_daily, time_frame)
        if(!time_frame){
            time_frame = {
                last_daily_notification : null,
                last_hourly_notification : null,
                last_parse : null
            }
        }
        if(is_daily) time_frame.last_daily_notification = get_current_date()
        else if(!is_daily) time_frame.last_hourly_notification = (new Date()).getTime()
        // console.log('setting', is_daily, time_frame)
        chrome.storage.sync.set({'TIME_FRAME': time_frame});
    })
 }

 /** object
  * equality
  */

 const isEqual = (a, b) => {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (a.prototype !== b.prototype) return false;
    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every(k => isEqual(a[k], b[k]));
  };

/**
 * alarm functions
 */



const daily_notification_alarm = (cb) => {
    chrome.storage.sync.get(['TIME_FRAME'], par_tf => {
        let time_frame = par_tf.TIME_FRAME

        if(time_frame && time_frame.last_daily_notification){
            // no need
            return
        }

        chrome.storage.sync.get(['DATA'], par_data => {

            const data = par_data.DATA;
            if(!data) return;

            // let last_time = data.time_frame.last_daily_notification
            let today = get_current_date()
    
            if(/** last_time && isEqual(last_time, today) &&**/ 1 == 0){ // things we do for love
                // no notifications for now
            }
            else {
    
                chrome.storage.sync.get(['SETTING'], par_setting => {
                    const settings = par_setting.SETTING
                    

                    if(!settings.daily_notification) return;

                    const notification_message = data.contests.filter(contest => {
                        let [month, date, year] = new Date( contest.start ).toLocaleDateString("en-US").split("/")
                        if(!isEqual(get_current_date(), {month, date, year})) return false;
                        if(settings.div_1 && contest.div.indexOf('Div. 1') != -1) return true
                        if(settings.div_2 && contest.div.indexOf('Div. 2') != -1) return true
                        if(settings.div_3 && contest.div.indexOf('Div. 3') != -1) return true
                        return false
                    }).map(contest => {
                        return contest.event
                    }).join()
                    if(notification_message){
                        show_notification("Hello! It's contest day", notification_message, true)

                        
                    }
                    if(cb && typeof cb == 'function') cb()
                })
            }
        })




    })
}

const hour_notification_alarm = () => {  
    chrome.storage.sync.get(['TIME_FRAME'], par_tf => {
        let time_frame = par_tf.TIME_FRAME
        
        // if(time_frame && isEqual(time_frame.last_hourly_notification, get_current_date())){
        //     // no need
        //     return
        // }
        // console.log(time_frame)

        if(time_frame && time_frame.last_hourly_notification){
            let current = (new Date()).getTime()
            let prev = time_frame.last_hourly_notification
            let diff = (current - prev) / (1000 * 60)
            // console.log(diff)
            if(0 <= diff && diff <= 60) return; // within an hour no need 
        }

        // console.log(time_frame)
        // if(time_frame && time_frame.last_hourly_notification){
        //     const differ = date_difference_in_minute(new Date, time_frame.last_hourly_notification); console.log(differ)
        //     if((0 <= differ && differ <= 30)) return;
        // }

        chrome.storage.sync.get(['DATA'], par_data => {

            const data = par_data.DATA;
            if(!data) return;

            // let last_time = data.time_frame.last_daily_notification
            let today = get_current_date()
    
            if(/** last_time && isEqual(last_time, today) &&**/ 1 == 0){
                // no notifications for now
            }
            else {
    
                chrome.storage.sync.get(['SETTING'], par_setting => {
                    const settings = par_setting.SETTING

                    if(!settings.hourly_notification) return;

                    const notification_message = data.contests.filter(contest => {
                        
                        const cur_date = new Date();
                        const con_date = new Date(contest.start)
                        // console.log(cur_date)
                        // console.log(contest.start)
                        // console.log(con_date)
                        const diff = (con_date.getTime() - cur_date.getTime()) / (1000 * 60);  //console.log(diff)
                        if(!(0 <= diff && diff <= 60)) return false;

                        if(settings.div_1 && contest.div.indexOf('Div. 1') != -1) return true
                        if(settings.div_2 && contest.div.indexOf('Div. 2') != -1) return true
                        if(settings.div_3 && contest.div.indexOf('Div. 3') != -1) return true
                        return false

                    }).map(contest => {
                        return contest.event
                    }).join()
                    if(notification_message){
                        show_notification("Hello! You have a contest within an hour.", notification_message, false)
                        // data.time_frame.last_daily_notification = today
                        // console.log(data)
                        // chrome.storage.sync.set({'DATA': data})
                    }
                })
            }
        })




    })
}

const data_parsing_alarm = () => { 
    get_data()
}

function get_data(cb){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        try{
            chrome.storage.sync.get(['DATA'], par_data => {

                let data = par_data.DATA;

                data = JSON.parse(xhr.responseText) 
                if(data){
                    chrome.storage.sync.set({'DATA': data});
                    chrome.storage.sync.get(['TIME_FRAME'], par_tf => {
                        let time_frame = par_tf.TIME_FRAME
                        if(!time_frame){
                            time_frame = {
                                last_daily_notification : null,
                                last_hourly_notification : null,
                                last_parse : null
                            }
                        }
                        time_frame.last_parse = get_current_date()
                        chrome.storage.sync.set({'TIME_FRAME': time_frame});
                    })
                }
            })
            if(cb && typeof cb == 'function') cb()
        }catch(err){
            console.log(err)
        }
    }
    xhr.open('GET', 'https://cfthisweek-extension-backend.herokuapp.com/contest', true);
    xhr.send(null);
}

/*****
 * 
 * INITIATE APPLICATION
 * 
 * 
 * 
 * 
 * 
 */


chrome.alarms.create('DATA_PARSE', {periodInMinutes: 24 * 60})               
// let date = new Date()
// date.setSeconds(date.getSeconds() + 5)
chrome.alarms.create('DAILY_NOTIFICATION', {periodInMinutes: 2, delayInMinutes: 1})
chrome.alarms.create('HOUR_NOTIFICATION', {periodInMinutes: 2})

chrome.alarms.onAlarm.addListener((alarm) => { //console.log(alarm)
    // alarm
    if(alarm.name == 'DATA_PARSE') data_parsing_alarm()
    if(alarm.name == 'DAILY_NOTIFICATION') daily_notification_alarm()
    if(alarm.name == 'HOUR_NOTIFICATION') hour_notification_alarm()
})


const migrate = false

if(migrate){
    chrome.storage.sync.get( data => {
        chrome.storage.sync.remove( Object.keys(data), () => {
            set_default_settings(migrate)
            get_data( () => {
                daily_notification_alarm( hour_notification_alarm ) // TODO: need to find a better way to do this
            } )
        })
    })
} else{
    set_default_settings(migrate)
    get_data( () => {
        daily_notification_alarm( hour_notification_alarm ) // TODO: need to find a better way to do this
    } )
}
