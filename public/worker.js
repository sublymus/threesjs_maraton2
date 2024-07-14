console.log("Service Worker Loaded , server");
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("Push Received...");
    self.registration.showNotification(data.title, {
        body: data.content,
        icon: 'https://sublymus.com/logo.png'
    });
    console.log(e);
});