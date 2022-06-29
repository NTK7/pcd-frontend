import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './Detection.css';

function CovidDetection() {
	const [result, setResult] = useState(null);
	const [imageFiles, setImageFiles] = useState(null);

	useEffect(() => {
		if (imageFiles) {
			console.log("updated files in c", imageFiles)
			console.log("updated files first element", imageFiles[0])
		}
	}, [imageFiles])
	

	const uploadImage = () => {
		let reader = new FileReader();
		reader.readAsDataURL(imageFiles[0]);
		console.log('files', imageFiles);
		reader.onload = (e) => {
			const URL__ENDPOINT = 'http://localhost:5000/predict';

			const formData = new FormData();
			formData.append('file', imageFiles[0], imageFiles[0].name);
			formData.append('type', 0);

			axios.post(URL__ENDPOINT, formData).then((res) => {
				console.log(res);
				setResult(res.data);
			});
		};
	};

	return (
		<div className="detection">
			<h2 style={{ color: 'red' }}>COVID DETECTOR</h2>
			<p className="detection__help">
				<span style={{ color: 'red' }}>How it works: </span>Click the <strong style={{ color: 'red' }}>UPLOAD</strong>{' '}
				image button to upload the image and Click the <strong style={{ color: 'red' }}>DETECT</strong> button to get
				the result.
			</p>
			<div className="detection__sampleInputs">
				<h3 style={{ color: 'red' }}>Sample Inputs</h3>
				<div className="detection__sampleInputsImages">
					<img
						src="https://prod-images-static.radiopaedia.org/images/157210/332aa0c67cb2e035e372c7cb3ceca2_jumbo.jpg"
						alt=""
					/>
				</div>
			</div>

			{result && (
				<div className={result !== 'Normal' ? 'detection__resultPositive' : 'detection__resultNegative'}>
					<p> Result: {result}</p>
				</div>
			)}
			<div className="detection__uploadDetect">
				{/* upload */}
				<Button className="detection__uploadDetectUpload">
					<label for="imageUpload">UPLOAD</label>
					<PublishIcon fontSize="small" className="detection__uploadDetectUploadIcon" />
				</Button>

				{/* input file */}
				<input
					style={{ display: 'none' }}
					type="file"
					name="cfile"
					id="cfile"
					accept=".png, .jpg, .jpeg"
					onChange={(e) => setImageFiles(e.target.files)}
				/>

				{/* detect */}
				<Button className="detection__uploadDetectDetect" onClick={uploadImage}>
					DETECT
					<SearchIcon fontSize="small" className="detection__uploadDetectUploadIcon" />
				</Button>
			</div>
		</div>
	);
}

export default CovidDetection;
