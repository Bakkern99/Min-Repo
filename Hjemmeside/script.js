/*The code for the fun fact generator*/
function showFunFact(artist){
    let funFact;

    switch(artist){
        case 'Linkin Park':
            funFact = 'Meteora is one of the best-selling albums of the 21st century, with over 16 million copies sold worldwide.';
            break;
        case 'Nephew':
            funFact = 'The album "Hjertestarter" includes a bonus track and topped the charts in Denmark.';
            break;
        case 'AC/DC':
            funFact = 'The Razors Edge features the iconic hit "Thunderstruck," which became one of AC/DC\'s signature songs.';
            break;
        case 'Bon Jovi':
            funFact = '"Slippery When Wet" includes some of Bon Jovi\'s biggest hits like "Livin\' on a Prayer" and "You Give Love a Bad Name."';
            break;
        case 'Wild Cherry':
            funFact = 'Wild Cherry\'s debut album features the classic hit "Play That Funky Music," which is still a fan favorite today.';
            break;
        default:
            funFact = 'No fun fact available for this artist.';
    }

    alert(funFact);
}



