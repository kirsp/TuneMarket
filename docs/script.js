let pwd = prompt("Please write here your password!");
if (pwd != "jiff01011") {
    window.location.href = "index.html";
}

// Variables
const loadedData = localStorage.getItem("TuneMarket-DATA");
const date = new Date();
const bg = document.getElementById("bg");
const box = document.getElementById("hiddenBox");

let data = {
    theme: "light",
    notifications: [
        {
            name: "Welcome",
            msg: `
            <h2>Welcome in the TuneMarket!</h2><br><br>

            <span>Here you can buy songs, musics, instruments, ringtones and much more things! If you have any problem with this website, or you have an idea to upgrade this site, go to - Settings > Common Develop > Error report - to report error - Settings > Common Develop > Upgrade idea - to report an upgrade idea! If the report was very helpful, we give you an Developer rank, and you can make more things on this website. And you can earn gifts in every month. But for this you need to give the monthly report in the - Settings > Developer - section. NOTE: This Developer mode in the settings will avaliable after you claimed the Developer rank.</span><br><br>

            <em>The greeting is sent by the creator, Kirsp from the Philippines.</em>
            `,
            readed: false,
        }   
    ],
    cart: [],
}

let musicList = [
    {
        id: "0001",
        name: "Waterslide", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Waterslide.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0001.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.35",
            commericall: "0.45",
            priceType: "GBP",
        },
        rating: "8",
    },
    {
        id: "0002",
        name: "Bar life", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Bar life.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0002.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.25",
            commericall: "0.35",
            priceType: "GBP",
        },
        rating: "7",
    },
    {
        id: "0003",
        name: "Forest", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Forest.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0003.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.16",
            commericall: "0.25",
            priceType: "GBP",
        },
        rating: "6",
    },
    {
        id: "0004",
        name: "Successful", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Successful.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0004.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.25",
            commericall: "0.35",
            priceType: "GBP",
        },
        rating: "7",
    },
    {
        id: "0005",
        name: "Painful memories", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Painful memories.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0005.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.5",
            commericall: "1",
            priceType: "GBP",
        },
        rating: "9",
    },
    {
        id: "0006",
        name: "Crazy", 
        demo_url: "src/data/demo_musics/albums/Travel/musics/Crazy.mp3",
        album_url: "src/data/demo_musics/albums/Travel/picture/0006.png",
        category: "Electronic,Travel,Social",
        date: "2022",
        album: "Travel",
        itemPrice: {
            personal: "0.15",
            commericall: "0.20",
            priceType: "GBP",
        },
        rating: "4",
    },
];

function ud() {
    localStorage.setItem("TuneMarket-DATA", JSON.stringify(data));
}

function findByKeyMLName(key) {
    for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].name == key) {
            return i;
        }
    }
    if (typeof key != "number") {
        return null;
    }
}

const music = {
    open: (id) => {
        box.style.display = "block";
        const currMusic = musicList[Number(id) - 1];
        box.innerHTML = `
            <div class="x" onclick="music.close()">X</div>
            <h3><u>Name:</u> ${currMusic.name}</h3>
            <img src="${currMusic.album_url}" width="100px" height="100px"><br>
            <h3><u>Album:</u> ${currMusic.album}</h3>
            <h3><u>Category:</u> ${currMusic.category}</h3>
            <h3><u>Date:</u> ${currMusic.date}</h3>
            <h3><u>Rating:</u> ${currMusic.rating}</h3>
            <h3><u>Price:</u></h3>
            <dl>
                <dd>For personal use: ${currMusic.itemPrice.personal} ${currMusic.itemPrice.priceType}</dd>
                <dd>For commericall use: ${currMusic.itemPrice.commericall} ${currMusic.itemPrice.priceType}</dd>
            </dl>
            <h3><u>ID:</u> #${currMusic.id}</h3><br>
            <h3><u>Demo:</u></h3><br>
            <audio controls id="currMusicPlaying">
                <source src="${currMusic.demo_url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio><br><br><br>
            <div class="center">
                <select id="itemType">
                    <option value="1">Commericall use</option>
                    <option value="0">Personal use</option>
                </select><br><br>
                <button class="buyBtn" onclick="music.buy(${currMusic.id})">BUY</button><br><br>
                <button class="addToCartBtn" onclick="music.addToCart(${currMusic.id})">ADD TO CART</button><br><br>
            </div>
        `;
    },

    preorder: (id) => {

    },

    buy: (id) => {
        let itemDatas = [];
        if (id.slice(0, 3) == "buy") {
            itemDatas = id.split("#");
            if (itemDatas[1] <= 0) {
                alert("You can't buy item for 0!");
            } else {
                box.innerHTML = `
                <h2 style="font-size: 26px; text-decoration: none;">Your purchase id: </h2><u style="font-size: 26px;">${itemDatas[0]}#${itemDatas[1]}-${itemDatas[1] * date.getFullYear() * date.getDate()}</u><br><br>
                <h2>Total price: ${itemDatas[1]} GBP</h2>
                <div id="buyForm"></div>
                `;
    
                document.getElementById("buyForm").innerHTML = `
                <form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_xclick">
                    <input type="hidden" name="business" value="kirsp.krips@gmail.com">
                    <input type="hidden" name="currency_code" value="GBP" id="buyItemType">
                    <input type="hidden" name="item_name" value="${itemDatas[0]}#${itemDatas[1]}-${itemDatas[1] * date.getFullYear() * date.getDate()}" id="buyItemName">
                    <input type="hidden" name="amount" value="${itemDatas[1]}" id="buyItemPrice">
                    <input type="image" src="http://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="Make payments with PayPal - it's fast, free and secure!">
                </form>`;
            }
        }
    },

    addToCart: (id) => {
        const currMusic = musicList[Number(id) - 1];
        data.cart.push(currMusic.id  + "/" + document.getElementById("itemType").value);
        ud();
        shoppingCart();
    },

    close: () => {
        box.style.display = "none";
        document.getElementById("currMusicPlaying").pause();
        document.getElementById("currMusicPlaying").currenTime = 0;
    },

    search: (value) => {
        let numVal = Number(value);
        if (isNaN(numVal)) {
            if (findByKeyMLName(value) != null) {
                music.open(findByKeyMLName(value) + 1);
            } else {
                alert("Wrong ID or name!");
            }
        } else {
            music.open(numVal);
        }
    }
}

if (loadedData != null) {
    data = JSON.parse(loadedData);
} else {
    ud();
}

if (data.theme == "light") {
    document.getElementById("theme").innerHTML = `<link rel="stylesheet" href="style-light.css">`;
    document.getElementById("changeTheme").style.backgroundImage = "url(src/icons/dark.png)";
} else {
    document.getElementById("theme").innerHTML = `<link rel="stylesheet" href="style-dark.css">`;
    document.getElementById("changeTheme").style.backgroundImage = "url(src/icons/light.png)";
}

function changeTheme() {
    if (data.theme == "light") {
        document.getElementById("theme").innerHTML = `<link rel="stylesheet" href="style-dark.css">`;
        document.getElementById("changeTheme").style.backgroundImage = "url(src/icons/light.png)";
        data.theme = "dark";
    } else {
        document.getElementById("theme").innerHTML = `<link rel="stylesheet" href="style-light.css">`;
        document.getElementById("changeTheme").style.backgroundImage = "url(src/icons/dark.png)";
        data.theme = "light";
    }
    ud();
}

// The newest songs
let newSongSection = document.getElementById("s2");
if (musicList.length > 2) {
    newSongSection.innerHTML += `
        <dl>
            <dd>- <a onclick="music.open(${musicList[musicList.length - 1].id})">${musicList[musicList.length - 1].name}</a></dd>
            <dd>- <a onclick="music.open(${musicList[musicList.length - 2].id})">${musicList[musicList.length - 2].name}</a></dd>
            <dd>- <a onclick="music.open(${musicList[musicList.length - 3].id})">${musicList[musicList.length - 3].name}</a></dd>
        </dl>
    `;
} else {
    newSongSection.innerHTML += "<span>Sorry, currently not avaliable.</span>";
}

// The top rated song
let newSongRated = document.getElementById("s3");
if (musicList.length > 2) {
    let songRated;
    for (let i = musicList.length - 1; i > 0; i--) {
        if (musicList[i].rating == 10) {
            songRated = musicList[i].id;
        }
        
        if (musicList[i].rating == 9) {
            songRated = musicList[i].id;
        }
        
        if (musicList[i].rating == 8) {
            songRated = musicList[i].id;
        }
    }
    newSongRated.innerHTML += `
        <dl>
            <dd>- <a onclick="music.open(${songRated})">${musicList[Number(songRated) - 1].name}</a></dd>
        </dl>
    `;
} else {
    newSongRated.innerHTML += "<span>Sorry, currently not avaliable.</span>";
}

// The cheapest songs
let cheapSongSection = document.getElementById("s4");
if (musicList.length > 2) {
    let currPrice = 1;
    let currSong;
    for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].itemPrice.personal < currPrice) {
            currPrice = Number(musicList[i].itemPrice.personal);
            currSong = musicList[i].id;
        }
    }

    cheapSongSection.innerHTML += `
        <dl>
            <dd>- <a onclick="music.open(${currSong})">${musicList[Number(currSong) - 1].name}</a></dd>
        </dl>
    `;
} else {
    cheapSongSection.innerHTML += "<span>Sorry, currently not avaliable.</span>";
}

function hiddenMenu() {
    alert("Omex");
}

function closeBox() {
    box.style.display = "none";
}

function shoppingCart() {
    box.style.display = "block";
    box.innerHTML = `<div class="x" onclick="closeBox()">X</div><br><br><br><br>`;
    let itemId;
    let itemType;
    let itemTypeNaN;
    let itemPrice;
    let totalPrice = 0;
    let items = [];
    for (let i = 0; i < data.cart.length; i++) {
        itemId = Number(data.cart[i].slice(0, data.cart[i].indexOf("/"))) - 1;
        itemType = Number(data.cart[i].slice(data.cart[i].indexOf("/") + 1, data.cart[i].length));
        if (itemType == 0) {
            itemTypeNaN = "Personal";
            itemPrice = musicList[itemId].itemPrice.personal + " " + musicList[itemId].itemPrice.priceType;
            totalPrice += Number(musicList[itemId].itemPrice.personal);
        } else {
            itemTypeNaN = "Commericall";
            itemPrice = musicList[itemId].itemPrice.commericall + " " + musicList[itemId].itemPrice.priceType;
            totalPrice += Number(musicList[itemId].itemPrice.commericall);
        }
        items.push(i);
        box.innerHTML += `
        <div class="item-in-cart" style="background-image: url(${musicList[itemId].album_url});">
            <span class="name">${musicList[itemId].name}</span>
            <img id="delItemFromCart" onclick="delItemFromCart(${i})" src="src/icons/trash.png">
            <span class="type">${itemTypeNaN} use</span>
            <span class="price">Price: ${itemPrice}</span>
        </div><br>`;
    }
    box.innerHTML += `
        <hr>
        <span>Total: ${totalPrice} GBP</span>
        <button class="buyBtn" onclick="music.buy('buy#${totalPrice}#${items}')">BUY</button>
        <br><br>
    `;
}

if (musicList.length > 0) {
    for (let i = 0; i < musicList.length; i++) {
        document.getElementById("musicsList").innerHTML += "<option value=" + musicList[i].id + ">" + musicList[i].name + "</option>";
    }
}

function delItemFromCart(item) {
    data.cart.splice(item, 1);
    ud();
    shoppingCart();
}

function checkNotifications() {
    const noti = document.getElementById("notifications-marker");
    let notiNum = 0;
    if (data.notifications.length > 0) {
        for (let i = 0; i < data.notifications.length; i++) {
            if (data.notifications[i].readed == false) {
                notiNum += 1;
            }           
        }

        if (notiNum > 0) {
            if (notiNum > 9) {
                noti.classList.remove("hidden");
                noti.innerHTML = "<span>9+</span>";
            } else {
                noti.classList.remove("hidden");
                noti.innerHTML = "<span>" + notiNum + "</span>";
            }
        }
    }
}
checkNotifications();

const opn = {
    music: (id) => {
        music.open(id);
    },

    categories: () => {
        document.getElementById("texts").innerHTML = `
            <div id="categories-sidenav">
                <div class="section selected">All</div>

                <div class="section-name">Instruments</div>
                <div class="section">Guitar</div>
                <div class="section">Piano</div>
                <div class="section">Drum/Drumpad</div>
                <div class="section">Violin</div>
                <div class="section">Flute</div>
                
                <div class="section">Ringtones</div>
                
                <div class="section-name">Vlog/Movie</div>
                <div class="section">Background musics</div>
            </div>
        `;
    },
    
    notifications: () => {
        document.getElementById("texts").innerHTML = "";
        for (let i = 0; i < data.notifications.length; i++) {
            document.getElementById("texts").innerHTML = "<div class='notification' onclick='opn.notification(" + i + ")'><span class='name'>" + data.notifications[i].name + "</span><span class='msg'>" + data.notifications[i].msg.slice(0,  40) + "...</span><div class='del' id='delItemFromNotifications'></div></div>";
        }
    },

    notification: (id) => {
        document.getElementById("texts").innerHTML = "";
    },
}

function checkUrl() {
    if (window.location.href == "https://kirsp.github.io/TuneMarket#notifications") {
        opn.notifications();
    } else if (window.location.href.slice(0, 40) == "https://kirsp.github.io/TuneMarket#music") {
        opn.music(window.location.href.slice(41, window.location.href.length - 1));
    } else if (window.location.href == "https://kirsp.github.io/TuneMarket#categories") {
        opn.categories();
    } else if (window.location.href.slice(0, 43) == "https://kirsp.github.io/TuneMarket#buyMusic") {
        music.buy(window.location.href.slice(43, window.location.href.length - 1));
    }
}

checkUrl();

const notification = {
    open: (id) => {
        opn.notification(id);
    },

    delete: () => {

    }
}