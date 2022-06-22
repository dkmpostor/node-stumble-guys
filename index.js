const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = require('delay');

const GoStumble = (code, auth) => new Promise((resolve, reject) => {

    fetch(`http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/${code}`, {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
███████ ████████ ██    ██ ███    ███ ██████  ██      ███████         
██         ██    ██    ██ ████  ████ ██   ██ ██      ██           
███████    ██    ██    ██ ██ ████ ██ ██████  ██      █████          
     ██    ██    ██    ██ ██  ██  ██ ██   ██ ██      ██            
███████    ██     ██████  ██      ██ ██████  ███████ ███████    

By : ${chalk.red('@dkmpostor')} - ${chalk.blue('https://dkmpostor.netlify.app/')}

Features :

1. ${chalk.magenta('Push Crown + Trophy')}
2. ${chalk.magenta('Push Trophy Only')}
`);

    const feature = rs.question('[+] Enter feature needed : ');
    const auth = rs.question('[+] Enter your auth token : ');
    const time = rs.question('[+] Enter Delay in milisecond ( Ex : 1000 = 1 sec ) : ');
    console.log('');

    if (feature == '1') {

        while (true) {

            var code = '3';
            const result = await GoStumble(code, auth, time);
            if (!result) {

                console.log(chalk.red(`[ ${moment().format('HH:mm:ss')} ] Wrong cookie or Expired cookie !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                const crown = data.User.Crowns;
                
                console.log(chalk.green(`[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | ${chalk.blue(`Trophy : ${trophy}`)} | ${chalk.blue(`Crown : ${crown}`)}`));
                await delay(time)

            } else if (result == 'BANNED') {

                console.log(chalk.red(`[ ${moment().format('HH:mm:ss')} ] Banned !`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }
        
    } else if (feature == '2') {

        while (true) {

            var code = '2';
            const result = await GoStumble(code, auth, time);
            if (!result) {

                console.log(chalk.red(`[ ${moment().format('HH:mm:ss')} ] Wrong cookie or Expired cookie !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                
                console.log(chalk.green(`[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | ${chalk.blue(`Trophy : ${trophy}`)}`));
                await delay(time);
                
            } else if (result == 'BANNED') {

                console.log(chalk.red(`[ ${moment().format('HH:mm:ss')} ] Banned !`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }

    } else {

        console.log(chalk.red('[!] Features not available !'));

    }
    

})();
