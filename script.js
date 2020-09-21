const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let initialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

let photosArray=[];

// Unsplash API
let fetchCount = 5;
const apiKey = 'jCowlFqfwkwSwDRbxer1wS9IdFHzs0KHu6dz-vlwu64';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${fetchCount}`;

// Check if all images loaded
function imageLoaded() {
    
    imagesLoaded++;   
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);        
    }

}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display Photos
function displayPhotos() {

    imagesLoaded=0;
    totalImages = photosArray.length;
    console.log('totalImages = ', totalImages);

    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank'
        });

        // Create <img> for Photo 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
        })

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from Unsplash API
async function getPhotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if (initialLoad) {
            initialLoad=false;
            fetchCount = 10;
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${fetchCount}`;
        }
        
    } catch (error) {
        // Catch error here
    }

}

// Check to see if scrolling is near bottom of page, Load More Photos...
window.addEventListener('scroll', ()=>{

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        // loader.hidden = false; // This line is commented out for showing infinity effect
        getPhotos();
        console.log('more photos loaded...');
    }

});

// On Load
getPhotos();