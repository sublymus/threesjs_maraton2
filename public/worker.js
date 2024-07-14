console.log("Service Worker Loaded , server");
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("Push Received...");
    self.registration.showNotification(data.title, {
        body: data.content,
        icon: 'https://sublymus.com/logo.png'
    });
    var audio = new Audio(`http://localhost:3333/src/res/audio/mixkit-sci-fi-confirmation-914.mp3`);
    console.log(audio);
    audio.play();
});