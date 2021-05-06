setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

const url = "http://gruppe-67.developerakademie.com/group67join/upload.php";

//jQuery.ready(function(){ // Warte auf DOM geladen zu werden
//	document.querySelector("#uploadform").addEventListener ("submit", async function (evt) {//
//		evt.preventDefault ();
//		const files = document.querySelector('[type=file]').files;
//		const formData = new FormData();
//		
//		for (let i = 0; i < files.length; i++) {
//			let file = files[i];
//			formData.append('files[]', file)
//		}
//		
//		await fetch (url, {
//			method: "POST",
//			body: formData,
//		}).then ((response) => {
//			console.log (response);
//			if (response.status === 200) {
//				document.querySelector("#result").innerHTML = "Dateien wurden geladen";
//			}
//		});
//		return false;
//	});
//	
//	document.querySelector("#files").addEventListener ("change", function (evt) {
//		let files = evt.target.files; 
//		for (let i = 0, f; f = files[i]; i++) {
//			let reader = new FileReader();
//			reader.onload = (function(theFile) {
//				return function(e) {
//					let span = document.createElement('span');
//					span.innerHTML = ['', escape(theFile.name), ''].join('');
//					document.querySelector ('.filelist').insertBefore(span, null);
//				};
//			})(f);
//			reader.readAsDataURL(f);
//		}
//	})
//  });

  window.onload = function(){ // Warte auf DOM geladen zu werden
	console.log("DOCUMENT READY");
	// document.querySelector("#uploadform").addEventListener ("submit", function (evt) {
	// 	evt.preventDefault ();
	// 	const files = document.querySelector('[type=file]').files;
	// 	const formData = new FormData();
		
	// 	for (let i = 0; i < files.length; i++) {
	// 		let file = files[i];
	// 		formData.append('files[]', file)
	// 	}
		
	// 	fetch (url, {
	// 		method: "POST",
	// 		body: formData,
	// 	}).then ((response) => {
	// 		console.log (response);
	// 		if (response.status === 200) {
	// 			document.querySelector("#result").innerHTML = "Dateien wurden geladen";
	// 			return false;
	// 		}
	// 	}).catch(error =>{
	// 		console.log(error, "ULOAD ERROR");
	// 		return false;
	// 	});
	// });
	
	document.querySelector("#files").addEventListener ("change", function (evt) {
		let files = evt.target.files; 
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
  };


function handleUpload(evt) {
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
	}).catch(error =>{
		console.log(error, "ULOAD ERROR");
		
	});

	return false;
}