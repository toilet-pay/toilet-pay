# `This chatbot app was made on a hackathon and not maintained for a long time. So expect a very pure code quality.`

# Toilet pay



```javascript
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    processPosition(position.coords);

    const watchID = navigator.geolocation.watchPosition((position) => {
      processPosition(position.coords);
    });
  });
} else {
  /* geolocation IS NOT available */
}

function processPosition(coords ) {
  
  document.getElementById('location').innerHTML = `${coords.latitude},${coords.longitude}`;
}


```
