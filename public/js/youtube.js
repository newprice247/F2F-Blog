
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=web%20coder&key=${apiKey}'
const apiKey  = 'AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o'

fetch(apiUrl).then((result) => {
 return result.json;
}).then ((data) => {
    console.log(data);

});