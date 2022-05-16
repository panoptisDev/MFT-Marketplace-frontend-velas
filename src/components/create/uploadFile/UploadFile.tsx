import { useState } from 'react';
import ReactPlayer from 'react-player';
import './uploadFile.scss'
type PropsType = {
    setFileSrc(value:any):void
    setFileType(value:any):void
}
export default function UploadFile({setFileSrc, setFileType} : PropsType) {
    // const classes = useStyles();
    const [mainFile, setMainFile] = useState(null);
	const [ previewImg, setPreviewImg ] = useState(null);
	const [ isShowVideo, showVideo ] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [ isShowPreview, showPreview ] = useState(false);

	const onChangeMainFile =(e:any) => {

        // if (e.target.files && e.target.files.length > 0) {
		// 	const type = e.target.files[0].type.split("/")[0];
		// 	if (type === "video") {
		// 		showVideo(true);
		// 		showPreview(true);
		// 	} else {
		// 		showVideo(false);
		// 		showPreview(false);
		// 	}
		// 	setMainFile(e.target.files[0]);
		// }

		var files = e.target.files;
        const file = e.target.files[0]; 
        setMainFile(file);
        var filesArray = [].slice.call(files);
        filesArray.forEach((e:any) => {
            if (e.name.search('avi') >= 0 || e.name.search('mpg') >= 0 || e.name.search('m4v') >= 0 || e.name.search('mp4') >=0){
                setFileType('video')
                setFileSrc(file)
                showVideo(true);
				showPreview(true);
            }
            if (e.name.search('mp3') >=0){
                setFileType('audio')
                setFileSrc(file)
                showVideo(true);
				showPreview(false);
            }
            if (e.name.search('png') >=0 || e.name.search('bmp') >=0 || e.name.search('gif') >=0 || e.name.search('jpg') >=0 || e.name.search('jpeg') >=0 || e.name.search('webp') >=0){
                setFileType('image')
                setFileSrc(file)
                showVideo(false);
				showPreview(false);
            }
        });
	}

	const removeMainImage =(e) => {
		e.preventDefault();
		console.log(4705);
		setMainFile("");
        setFileType("");
        setFileSrc(null);
        setIsPlaying(true);
	}
    const onChangePreviewImg =(e) => {
		if (e.target.files && e.target.files.length > 0) {
			setPreviewImg(e.target.files[0]);
		}
	}

	const removePreviewImg =(e) => {
		e.preventDefault();
		setPreviewImg("");
	}
    console.log(mainFile);
  return (
      <>
      <div className="fileContainer">
        <label className="rbFileInput" htmlFor="main_file_input">
            <input type="file" id="main_file_input" name="main_file" style={{ display: 'none' }}
                    accept=".jpg,.png,.gif,.svg,.mp4,.webm,.mp3,.wav,.ogg,.glb,.gltf,.max" onChange={onChangeMainFile} />
            { !mainFile ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
                <i className="fa fa-image rbFileIcon" /> }
            { mainFile && 
            <div className="rbFile">
                <span className={'removeImg'} onClick={removeMainImage}>&times;</span>
                {isShowVideo
                    ?
                    <>
                        <ReactPlayer width="100%" height="calc(100%-50px)" url={ URL.createObjectURL(mainFile) }
                                        playing={ isPlaying } controls />
                        <div className="video-change" onClick={onChangeMainFile}>Change</div>
                    </>
                    : <img src={ URL.createObjectURL(mainFile) } width={300} height={200} alt = '' />
                }
            </div> }
        </label>
        
    </div>
      {
            isShowPreview &&
            <>
                <p className="text-label">Preview Image<span className="text-danger">*</span></p>
                <p>Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card
                    display of your item.</p>
                <div className="fileContainer w-h-160">
                    <label className="rbFileInput" htmlFor="preview_input">
                        <input type="file" id="preview_input" name="main_file" accept=".jpg,.png,.gif,.svg"
                                style={{ display: 'none' }} onChange={onChangePreviewImg} />
                        { !previewImg ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
                            <i className="fa fa-image rbFileIcon" /> }
                        { previewImg && 
                            <div className="rbFile">
                            <span className={'removeImg'} onClick={removePreviewImg}>&times;</span>
                            <img src={ URL.createObjectURL(previewImg) } width={160} height={160} alt = ''/>
                        </div> }
                    </label>
                </div>
            </>
        }
      </>
    
  )
}
