import axios from "axios";

const toastr = window.toastr

const supportedFiles = {
	audio: ['mp3', 'wav', 'ogg', 'm4a', 'mpeg'],
	video: ['3gp', 'ogg', 'webm', 'ogg', 'mp4', 'mpeg'],
	document: ['pdf'],
	application: ['pdf'],
}

export default {

	 fileSizeWithUnit(size) {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
          size /= 1024;
          index++;
        }
        return `${size.toFixed(2)} ${units[index]}`;
      }
      ,

	sortCurriculum(arrayOfObjs, sortingJSON){
		let sortedIDs = [], sortedArray = arrayOfObjs;
		if(sortingJSON){
			try{ sortedIDs = JSON.parse(sortingJSON) }catch(e){ console.log(e) }
			sortedIDs = Array.isArray(sortedIDs) ? sortedIDs : [];
			sortedArray = arrayOfObjs.sort((a,b) => {
				return sortedIDs.indexOf( a.id ) - sortedIDs.indexOf( b.id )
			});
		}
		// sortedArray.forEach((obj, index) => {
		// 	obj.lectures = this.sortLectures(section.lectures, section.lecturesSorting)
		// });
		return sortedArray
	},

	sectionSortOnDrag(e){
		let {curriculum} = this.state
		let section = curriculum.splice(e.source.index, 1)
		let sectionsUnder = curriculum.splice(e.destination.index)
		
		// console.log({curriculum, draggedSection, sectionsUnder})
		curriculum = [...curriculum, ...section, ...sectionsUnder]
		this.setState({...this.state, curriculum})
		// axios call to save the sorting
		let data = this.createFormData({
			course_id: this.state.course.id,
			sorted: JSON.stringify(curriculum?.map(s => s.id)||[])
		})
		axios.post('/curriculum/sections/reorder', data).catch(e => console.log(e))
	},
	
	lectureSortOnDrag(e){

		console.log(e)
		let curriculum = this.state.curriculum
		let srcSectionID = Number( e.source.droppableId?.split('_')?.[1] )
		let destSectionID = Number( e.destination.droppableId?.split('_')?.[1] )

		let srcSectionIndex = curriculum.findIndex(s => s.id == srcSectionID)
		let destSectionIndex = curriculum.findIndex(s => s.id == destSectionID)

		let lecture = curriculum[srcSectionIndex]?.lectures.splice(e.source.index, 1)
		let lecturesAfter = curriculum[destSectionIndex]?.lectures.splice(e.destination.index)
		curriculum[destSectionIndex].lectures = [...(curriculum[destSectionIndex]?.lectures||[]), ...lecture, ...lecturesAfter]

		this.setState({...this.state, curriculum})

		let data = this.createFormData({
			course_id: this.state.course.id,
			section_id: curriculum[destSectionIndex]?.id,
			src_section_id: curriculum[srcSectionIndex]?.id,
			sorted: JSON.stringify(curriculum[destSectionIndex].lectures?.map(l => l.id) || []),
			lecture_id: lecture[0]?.id
		})

		axios.post('/curriculum/lectures/reorder', data).catch(e => console.log(e))
	},

	resourceSortOnDrag(e){
		console.log(e)
		let curriculum = this.state.curriculum
		let [,resourceID] = (e.draggableId?.split('_')||[])?.map(c => Number(c))
		let [,srcLectureID] = (e.source.droppableId?.split('_')||[])?.map(c => Number(c))
		let [,destLectureID] = (e.destination.droppableId?.split('_')||[])?.map(c => Number(c))
		
		let srcSectionIndex = curriculum.findIndex(s => s.lectures.find(l => l.id == srcLectureID))
		let srcLectureIndex = curriculum[srcSectionIndex]?.lectures.findIndex(l => l.id == srcLectureID)

		let destSectionIndex = curriculum.findIndex(s => s.lectures.find(l => l.id == destLectureID))
		let destLectureIndex = curriculum[destSectionIndex]?.lectures.findIndex(l => l.id == destLectureID)

		let resource = curriculum[srcSectionIndex]?.lectures?.[srcLectureIndex]?.resources?.splice(e.source.index, 1) || []
		let destLecResources = curriculum[destSectionIndex]?.lectures?.[destLectureIndex]?.resources || []
		let resourcesAfter = destLecResources.splice(e.destination.index)
		
		if(curriculum[destSectionIndex]?.lectures?.[destLectureIndex]?.resources){
			curriculum[destSectionIndex].lectures[destLectureIndex].resources = [...destLecResources, ...resource, ...resourcesAfter]
		}

		let destLecResourcesSorting = JSON.stringify(curriculum[destSectionIndex]?.lectures?.[destLectureIndex]?.resources?.map(r => r.id))
		// console.log({ resourceID, srcLectureID, srcLectureIndex, srcSectionIndex, destLectureID, destSectionIndex, destLectureIndex, curriculum })
		let data = this.createFormData({
			course_id: this.state.course.id,
			section_id: curriculum[destSectionIndex]?.id,
			src_section_id: curriculum[srcSectionIndex]?.id,
			lecture_id: curriculum[destSectionIndex]?.lectures?.[destLectureIndex]?.id,
			src_lecture_id: curriculum[srcSectionIndex]?.lectures?.[srcLectureIndex]?.id,
			resource_id: resource[0]?.id,
			sorted: destLecResourcesSorting
		})

		axios.post('/curriculum/resources/reorder', data)

		this.setState({...this.state, curriculum})
	},
	
	reOrderArray(arr, source, destination){
		let item = arr.splice(source, 1)
		let itemsAfter = arr.splice(destination)
		return [...arr, ...item, ...itemsAfter]
	},
	
	saveSectionTitle(section, index){
		let curriculum = [...this.state.curriculum]
		curriculum[index] = section
		this.setState({...this.state, curriculum})
		// Axios call to update section
		let data = this.createFormData({
			course_id: this.state.course.id,
			section_id: section.id,
			title: section.title
		})
		axios.post('/curriculum/section/title/update', data).catch(e => console.log(e))

	},

	updateLecture(edits, lectureIndex, sectionIndex){
		// console.log(edits)
		// return
		let curriculum = [...this.state.curriculum]
		let lecture = curriculum[sectionIndex].lectures[lectureIndex]
		lecture.title = edits.title || lecture.title
		lecture.description = edits.description || lecture.description
		lecture.content = edits.content || lecture.content
		
		this.setState({...this.state, curriculum})
		// Axios call to update lecture title
		
		let data = this.createFormData({
			course_id: this.state.course.id,
			section_id: curriculum[sectionIndex].id,
			lecture_id: lecture.id,
			title: lecture.title,
			description: lecture.description,
			content: lecture.content,
		})
		axios.post('/curriculum/lecture/update', data).catch(e => console.log(e))
	},

/* 	saveLectureTitle(lecture, lectureIndex, sectionIndex){
		let curriculum = [...this.state.curriculum]
		curriculum[sectionIndex].lectures[lectureIndex] = lecture
		this.setState({...this.state, curriculum})
		// Axios call to update lecture title
	}, */
	isAllowedFileExtension(type, extention){
		return (supportedFiles[(type|| '').toLowerCase()] && supportedFiles[(type|| '').toLowerCase()].includes( (extention||'').toLowerCase() ))
	},


	uploadFilesInQue(){
		const {ajax}  = window?.$
		if(!ajax){return};
		
		let data = this.createFormData({
			course_id: this.state.course.id,
		})
		let uploadFilesQue = this.state.uploadFilesQue


		const handleXHRLoad = (event, key) => {
			// console.log(event)
			// Upload complete
		}
		const handleXHRProgress = (event, key) => {
			let uploadFilesQue = this.state.uploadFilesQue
			uploadFilesQue[key].progress = ( (event.loaded / event.total) * 100 )
			this.setState({...this.state, uploadFilesQue})
		}
		const handleXHRError = (e, key) => {
			console.log('error', e)
			let uploadFilesQue = this.state.uploadFilesQue
			uploadFilesQue[key] = {...uploadFilesQue[key], error: true, uploading: false}
			this.setState({...this.state, uploadFilesQue})
			uploadFilesQue[key]?.onError(e, key)
		}
		const handleXHRAbort = (event, key) => {
			console.log('Abort', event)
			// let uploadFilesQue = this.state.uploadFilesQue
			// uploadFilesQue[key].error = true
			// uploadFilesQue[key].uploading= false
			// this.setState({...this.state, uploadFilesQue})
		}
		
		Object.keys(uploadFilesQue).forEach(key => {
			if(uploadFilesQue[key].uploading && !uploadFilesQue[key].error){
				return
			}
			uploadFilesQue[key].uploading = true

			uploadFilesQue[key].fields.forEach(field => {
				data.delete(field)
				if(uploadFilesQue[key][field]){
					data.append(field, uploadFilesQue[key][field])
				}
			})

			ajax({
				type: 'POST',
				url: uploadFilesQue[key].endpoint, //this.state.urls.createLecture,
				processData: false,
          		contentType: false,
				data: data,
				xhr: () => {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener("progress", e => handleXHRProgress(e, key),false);
					xhr.addEventListener("load", e => handleXHRLoad(e, key), false);
					xhr.addEventListener("error", e => handleXHRError(e, key), false);
					xhr.addEventListener("abort", e => handleXHRAbort(e, key), false);
					return xhr;
				},
				success: data => uploadFilesQue[key]?.callback(data, key),
				error: e => handleXHRError(e, key)
			})
			.catch(e => handleXHRError(e, key))
		})
	},

	uploadFilesAsLectures(files, section){
		let filesFiltered = files.filter(file => this.isAllowedFileExtension( file.type?.split('/')[0], file.type?.split('/')[1] ) )

		if(filesFiltered.length != files.length){
			alert('Only files with following extentions are allowed.\n mp3, wav, ogg, 3gp, webm, mp4 and pdf')
		}
		files = null;
		files = filesFiltered;
		filesFiltered = null;

		const callback = (data, key) => {

			let state = this.state
			let sectionIndex = state.curriculum.findIndex(s => s.id == section.id)
			
			if( data?.id && !data?.error){
				delete state.uploadFilesQue[key]
				state.curriculum[sectionIndex].lectures.push(data)
			}else{
				// delete state.uploadFilesQue[key]
				state.uploadFilesQue[key].error = true
				state.uploadFilesQue[key].uploading = false
				toastr.error(data.error || `An Error occured while uploading ${state.uploadFilesQue[key].file.name}`)
			}
			this.setState({...state})
		}
		const onError = (e, key) => {
			console.log(e)
			state.uploadFilesQue[key] = {...state.uploadFilesQue[key], error: true, uploading: false}
			this.setState({...state})
			toastr.error(data.error || `An Error occured while uploading ${state.uploadFilesQue[key].file.name}`)
		}
		
		let uploadFilesQue = this.state.uploadFilesQue
		files.forEach(file => {
			uploadFilesQue[btoa(Math.random().toString()).substring(5,10)] = {
				file,
				uploading: false,
				error: false,
				progress: 0,
				section_id: section.id,
				callback,
				onError,
				endpoint: this.state.urls.createLecture,
				fields: ['file','title','description','content', 'section_id']
			}
		})
		this.setState({...this.state, uploadFilesQue})

		this.uploadFilesInQue()
		// this.setState({...this.state, uploadFilesQue})
	},

	createSection(title){
		let data = this.createFormData({
			course_id: this.state.course.id,
			section_title: title
		})

		axios.post(this.state.urls.createSection, data)
		.then(data => {
			console.log(data)
			if(data?.data?.id && !data?.data?.error ){
				let curriculum = this.state.curriculum || []
				curriculum.push(data.data)
				this.setState({...this.state, curriculum})
			}else{
				toastr.error(data.data?.error || 'An error occured while creating the section.')
			}
		})
		.catch(e => console.log(e))
	},

	createLecture(section, lectureDetails){
		// console.log({section, lectureDetails})
		let {uploadFilesQue} = this.state
		
		uploadFilesQue[btoa(Math.random().toString()).substring(5,10)] = {
			uploading: false,
			error: false,
			progress: 0,
			file: lectureDetails.file || {name: lectureDetails.title, size: 0},
			section_id: section.id,
			title: lectureDetails.title || '',
			description: lectureDetails.description || '',
			content: lectureDetails.content || '',
		}
		this.setState({...this.state, uploadFilesQue})
		this.uploadFilesAsLectures([], section)
	},

	togglePublishedLecture(lectureIndex, sectionIndex){

		let {curriculum} = this.state
		let lecture = curriculum[sectionIndex].lectures[lectureIndex]
		lecture.publish = lecture.publish == 1 ? 0 : 1
		this.setState({...this.state, curriculum})

		let data = this.createFormData({
			course_id: this.state.course.id,
			lecture_id: lecture.id,
			status: lecture.publish
		})
		axios.post(this.state.urls.toggleLecture, data).catch(e => console.log(e))
	},


	uploadResources(files, lecture){

		// Allow maximum fize upto 1GB
		let filesFiltered = files.filter(file => ( (((2663235/1024)/1024)/1024) < 1 ) )

		if(filesFiltered.length != files.length){
			alert('Files greater than 1GB in size won\'t be uploaded')
		}
		files = null;
		files = filesFiltered;
		filesFiltered = null;
		
		const callback = (data, key) => {
			
			let state = this.state
			let sectionIndex = state.curriculum.findIndex(s => {
				return s.lectures.find(l => l.id == lecture.id)
			})
			let lectureIndex = state.curriculum[sectionIndex].lectures.findIndex(l => l.id == lecture.id)
			
			if( data?.id && !data?.error){
				delete state.uploadFilesQue[key]
				state.curriculum[sectionIndex].lectures[lectureIndex].resources.push(data)
			}else{
				state.uploadFilesQue[key] = {...state.uploadFilesQue[key], error: true, uploading: false}
				toastr.error(data.error || `An Error occured while uploading ${state.uploadFilesQue[key].file.name}`)
			}
			this.setState({...state})
		}

		const onError = (e, key) => {
			state.uploadFilesQue[key] = {...state.uploadFilesQue[key], error: true, uploading: false}
			this.setState({...state})
			console.log({type: 'error', e, key})
		}

		let uploadFilesQue = this.state.uploadFilesQue
		files.forEach(file => {
			uploadFilesQue[btoa(Math.random().toString()).substring(5,10)] = {
				file,
				uploading: false,
				error: false,
				progress: 0,
				lecture_id: lecture.id,
				callback,
				onError,
				endpoint: this.state.urls.addResource,
				fields: ['file', 'lecture_id'],
			}
		})

		this.setState({...this.state, uploadFilesQue})
		this.uploadFilesInQue()
	},

	downloadResourceFile(lecture_id, resource_id){
		let url = `${window.location.origin}/resource/download/${btoa(this.state.course.id)}/${btoa(lecture_id)}/${btoa(resource_id)}`;
		window.open(url)
	},
	
	deletedResourceFile(lecture_id, resource_id){
		let data = this.createFormData({
			course_id: this.state.course.id,
			lecture_id,
			resource_id
		})

		axios.post('/curriculum/resource/delete', data)
		.then(res => {
			console.log(res)
			let curriculum = this.state.curriculum
			let lectureIndex = -1
			let sectionIndex = curriculum.findIndex(s => {
				return s.lectures.find((l,i) => {
					lectureIndex = l.id == lecture_id ? i : lectureIndex;
					return l.id == lecture_id
				})
			})
			let resourceIndex = curriculum[sectionIndex]?.lectures?.[lectureIndex].resources.findIndex(r => r.id == resource_id)
			curriculum[sectionIndex]?.lectures?.[lectureIndex].resources.splice(resourceIndex,1)
			this.setState({...this.state, curriculum})

			// console.log({sectionIndex, lectureIndex, resourceIndex, lecture_id, resource_id, lectures: curriculum[sectionIndex]})
		})
		.catch(e => console.log(e))
	},

	deleteLecture(lectureIndex, sectionIndex){
		if(!confirm('This will delete this lecture and all the resources associated.\nAre you sure to continue and delete?')){
			return
		}
		let {curriculum} = this.state
		let section = curriculum?.[sectionIndex]
		let lecture = section?.lectures.splice(lectureIndex, 1)?.[0]

		this.setState({...this.state, curriculum})
		
		let data = this.createFormData({
			course_id: this.state.course.id,
			lecture_id: lecture?.id
		})

		axios.post('/curriculum/lecture/delete', data).catch(e => console.log(e))
	},

	deleteSection(sectionIndex){
		if(!confirm('This will delete this Section and all the lectures and resources associated.\nAre you sure to continue and delete?')){
			return
		}
		let {curriculum} = this.state
		let section = curriculum?.splice(sectionIndex, 1)

		this.setState({...this.state, curriculum})
		
		let data = this.createFormData({
			course_id: this.state.course.id,
			section_id: section[0]?.id
		})

		axios.post('/curriculum/section/delete', data).catch(e => console.log(e))
	},
	
	cancelUpload(key){
		let uploadFilesQue = this.state.uploadFilesQue
		delete uploadFilesQue[key]
		this.setState({...this.state, uploadFilesQue})
	},
	retryUpload(key){
		let uploadFilesQue = this.state.uploadFilesQue
		uploadFilesQue[key] = {...uploadFilesQue[key], error: false, uploading: false, progress: 0}
		this.setState({...this.state, uploadFilesQue})
		this.uploadFilesInQue()
	},



	createFormData(data){
		let formData = new FormData()
		Object.keys(data).forEach(key => {
			formData.append( key, data[key] )
		})
		return formData
	}

	
}