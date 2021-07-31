const change_element = async () => {
    
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING
        
        if(settings) {
            
            if(settings.daily_notification) {
                document.getElementById('daily').setAttribute("checked", "true");
            } 

            if(settings.hourly_notification) {
                document.getElementById('hourly').setAttribute("checked", "true");
            } 

            if(settings.div_1) {
                document.getElementById('div_1').setAttribute("checked", "true");
            }

            if(settings.div_2) {
                document.getElementById('div_2').setAttribute("checked", "true");
            }

            if(settings.div_3) {
                document.getElementById('div_3').setAttribute("checked", "true");
            }

        }
    })
}

change_element()

document.getElementById('daily').addEventListener('change', () => {
    
    console.log(document.getElementById('daily').getAttribute('checked'))
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING

        if(document.getElementById('daily').getAttribute('checked')) {
            document.getElementById('daily').removeAttribute('checked')
        }else {
            document.getElementById('daily').setAttribute('checked', 'true')
        }
        
        settings.daily_notification = (!!(document.getElementById('daily').getAttribute('checked')))
        chrome.storage.sync.set({'SETTING': settings});
    })
})

document.getElementById('hourly').addEventListener('change', () => {
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING

        if(document.getElementById('hourly').getAttribute('checked')) {
            document.getElementById('hourly').removeAttribute('checked')
        }else {
            document.getElementById('hourly').setAttribute('checked', 'true')
        }
        settings.hourly_notification = (!!(document.getElementById('hourly').getAttribute('checked')))
        chrome.storage.sync.set({'SETTING': settings});
    })
})


document.getElementById('div_1').addEventListener('change', () => {
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING

        if(document.getElementById('div_1').getAttribute('checked')) {
            document.getElementById('div_1').removeAttribute('checked')
        }else {
            document.getElementById('div_1').setAttribute('checked', 'true')
        }
        settings.div_1 = (!!(document.getElementById('div_1').getAttribute('checked')))
        chrome.storage.sync.set({'SETTING': settings});
    })
})

document.getElementById('div_2').addEventListener('change', () => {
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING

        if(document.getElementById('div_2').getAttribute('checked')) {
            document.getElementById('div_2').removeAttribute('checked')
        }else {
            document.getElementById('div_2').setAttribute('checked', 'true')
        }
        settings.div_2 = (!!(document.getElementById('div_2').getAttribute('checked')))
        chrome.storage.sync.set({'SETTING': settings});
    })
})

document.getElementById('div_3').addEventListener('change', () => {
    chrome.storage.sync.get(['SETTING'], par_set => {
        let settings = par_set.SETTING

        if(document.getElementById('div_3').getAttribute('checked')) {
            document.getElementById('div_3').removeAttribute('checked')
        }else {
            document.getElementById('div_3').setAttribute('checked', 'true')
        }
        settings.div_3 = (!!(document.getElementById('div_3').getAttribute('checked')))
        chrome.storage.sync.set({'SETTING': settings});
    })
})

document.getElementById("khuljasimsim").addEventListener('dblclick', () => {
    if(document.getElementById("hidden_cell").style.display == "none") {
        document.getElementById("hidden_cell").style.display = "block"
    } else {
        document.getElementById("hidden_cell").style.display = "none"
    }
})

function contest_data() { //console.log('called')
    chrome.storage.sync.get(['DATA'], par_data => {
        const data = par_data.DATA
        if(data && data.contests && data.contests.length !== 0) {
            document.getElementById('contest_data').innerHTML = ''
            let total_contests = data.contests.length
            data.contests.filter(contest => {
                let elem = document.createElement('div')
                elem.innerHTML = `<a href='${contest.href}' target="_blank">${contest.event}</a><br><label style="font-size: 12px">${new Date(contest.start).toLocaleString()}</label>`
                total_contests -= 1
                if(total_contests !== 0) elem.innerHTML += '<hr style="background-color: #cfcfcf">'
                document.getElementById('contest_data').appendChild(elem)
            })
            document.getElementById("active_devices").innerHTML = `Active devices: ${data.active_devices}`
        } else{
            document.getElementById('contest_data').innerHTML = ''
            let elem = document.createElement('h3')
            elem.innerHTML = 'No contest in this week. Enjoy!'
            document.getElementById('contest_data').appendChild(elem)
        }
        //console.log('should change')
    })
}


chrome.browserAction.setIcon({path:"icon.png"});
contest_data()