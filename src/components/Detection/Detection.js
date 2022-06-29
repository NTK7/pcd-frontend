import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useState } from 'react';
import './Detection.css';

function Detection() {
	const [result, setResult] = useState(null);
	const [files, setFiles] = useState(null);
	const [type, setType] = useState(0);

	const uploadImage = () => {
		console.log('type', type);
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			const URL__ENDPOINT = 'http://localhost:5000/predict';

			const formData = new FormData();
			formData.append('file', files[0], files[0].name);
			formData.append('type', type);

			axios.post(URL__ENDPOINT, formData).then((res) => {
				console.log(res);
				setResult(res.data);
			});
		};
	};

	const resetData = () => {
		setResult(null);
		setFiles(null);
	}

	return (
		<div className="detection">
			<h2>PNEUMONIA / COVID DETECTOR</h2>
			<p className="detection__help">
				<span style={{ color: 'blue' }}>How it works: </span>Click the <strong style={{ color: 'blue' }}>UPLOAD</strong>{' '}
				image button to upload the image and Click the <strong style={{ color: 'blue' }}>DETECT</strong> button to get
				the result.
			</p>
			<div className="detection__sampleInputs">
				<h3>Sample Inputs</h3>
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

				<div className="detection__radioGroup">
					<FormControl>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="0"
							name="radio-buttons-group"
							style={{ display: 'flex', flexDirection: 'row' }}
							onChange={(e) => setType(e.target.value)}
						>
							<FormControlLabel value="0" control={<Radio color='primary'/>} label="Pneumonia" />
							<FormControlLabel value="1" control={<Radio color='primary' />} label="Covid" />
						</RadioGroup>
					</FormControl>
				</div>

				<div className='detection__validationMessages'>
					{files && ( <p className="detection__uploadDetectUploadText">File name: {files[0].name}</p>)}
					{!files && <p className="detection__uploadDetectUploadText">No image uploaded</p>}
				</div>

				<Button className="detection__uploadDetectUpload">
					<label for="imageUpload">UPLOAD</label>
					<PublishIcon fontSize="small" className="detection__uploadDetectUploadIcon" />
				</Button>

				<input
					style={{ display: 'none' }}
					type="file"
					name="file"
					id="imageUpload"
					accept=".png, .jpg, .jpeg"
					onChange={(e) => setFiles(e.target.files)}
				/>

				<Button className="detection__uploadDetectDetect" onClick={uploadImage} disabled={!files}>
					DETECT
					<SearchIcon fontSize="small" className="detection__uploadDetectUploadIcon" />
				</Button>

				<Button className="detection__uploadDetectReset" onClick={resetData}>
					RESET
					<RotateLeftIcon fontSize="small" className="detection__uploadDetectUploadIcon" />
				</Button>
			</div>
		</div>
	);
}

export default Detection;
