setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');


const url = "http://gruppe-67.developerakademie.com/group67join/uploads/upload.php";


// Ein EventListener wartet auf das submit
const form = document.querySelector("#uploadform").addEventListener ("submit", function (evt) {
	evt.preventDefault ();
	const files = document.querySelector('[type=file]').files;
    const formData = new FormData();
    
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		formData.append('files[]', file)
	}
	
	fetch (url, {
		method: "POST",
		body: formData,
	}).then ((response) => {
		console.log (response);
		if (response.status === 200) {
			document.querySelector("#result").innerHTML = "Dateien wurden geladen";
		}
	});
});

document.querySelector("#files").addEventListener ("change", function (evt) {
	let files = event.target.files; 
	for (let i = 0, f; f = files[i]; i++) {
		let reader = new FileReader();
		reader.onload = (function(theFile) {
            return function(e) {
                let span = document.createElement('span');
                span.innerHTML = ['', escape(theFile.name), ''].join('');
                document.querySelector ('.filelist').insertBefore(span, null);
            };
        })(f);
        reader.readAsDataURL(f);
	}
})