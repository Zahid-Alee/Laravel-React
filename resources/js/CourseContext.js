import React, { Component } from 'react';
const axios = require('axios')
const CourseContext = React.createContext();
// import CurriculumFunctions from './CurriculumFunctions';

// import {RiLoader3Fill} from 'react-icons/ri';

// const toastr = window.toastr

class CourseContextProvider extends Component {
	constructor(props) {
		super(props)

		// for(let fn in CurriculumFunctions){
		// 	this[fn] = CurriculumFunctions[fn]?.bind(this)
		// }

		this.state = {
			loading: true,
			course: {
				id:2,
			},
			promo: {
				video: {},
				image: {},
			},
			uploadFilesQue: {},
			...this,
		}

	}

	componentDidMount = async () => {
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		let token = document.querySelector('input[name="_token"]');

		if (token) {
			axios.defaults.headers.common['X-CSRF-TOKEN'] = token.value;
		} else {
			console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
		}
		this.loadCourseInfo()
	}

	async loadCourseInfo(){
		let pathParts = window.location.pathname.split('/')
		let dataURL = pathParts.slice(0,-1).join('/') +'/info/'+ pathParts.slice(-1).join('/')
		axios.get(dataURL)
		.then(res => {
			let curriculum = this.sortCurriculum(res.data?.curriculum, res.data.course.curriculumSorting)
			curriculum.forEach((section) => {
				section.lectures = this.sortCurriculum(section.lectures, section.lecturesSorting)
			})
			this.setState({ ...this.state, loading: false, ...res.data, curriculum })
			this.setSelectedCourses()
		})
		.catch(e => {
			console.log(e)
		})
	}

	// setSelectedCourses = () => {
	// 	function extractIDs(json){
	// 		let parsed = []
	// 		try{ parsed = JSON.parse(json || '[]') }catch(e){}
	// 		parsed = parsed.map(c => c.course_id)
	// 		return parsed
	// 	}
	// 	let selected_bundel_courses = extractIDs(this.state.course?.bundled_courses);
	// 	let selected_upsells = extractIDs(this.state.course?.upsells_courses);
	// 	this.setState({...this.state, course: { ...this.state.course, selected_upsells, selected_bundel_courses}})
	// }

	// handleInputField = (event) => {
	// 	let course = this.state.course;
	// 	course[event.target.name] = event.target.value;
	// 	this.setState({...this.state, course})
	// }

	// courseSelection = (event, cid) => {
	// 	let course = this.state.course;
	// 	if((course[event.target.name] || []).includes(cid)){
	// 		course[event.target.name] = course[event.target.name].filter(id => id != cid)
	// 	}else{
	// 		course[event.target.name].push(cid)
	// 	}
	// 	this.setState({...this.state, course})
	// }

	// addContributor = (instructor) => {
	// 	let contributor = {
	// 		id: instructor.id,
	// 		added_at: (new Date().setSeconds(1)/1000),
	// 		pending_approval: true,
	// 		instructor
	// 	}
	// 	let contributors = [ contributor, ...(this.state?.contributors||[]) ]
	// 	this.setState({...this.state, contributors})
	// }

	// handlePromoVideo = (e) => {
	// 	if(e.target.files?.length == 0){
	// 		return
	// 	}
	// 	let video = {
	// 		file: e.target.files[0],
	// 		src: URL.createObjectURL(e.target.files[0])
	// 	}
	// 	this.setState({...this.state, promo:{ ...this.state.promo, video }})
	// }

	// handlePromoImage = (e) => {
	// 	if(e.target.files?.length == 0){
	// 		return
	// 	}
	// 	if(e.target.files[0].type.split('/')[0] != 'image'){
	// 		toastr.error('Please select a valid image file.')
	// 	}
	// 	let image = {
	// 		file: e.target.files[0],
	// 		src: URL.createObjectURL(e.target.files[0])
	// 	}
	// 	this.setState({...this.state, promo:{ ...this.state.promo, image }})
	// }

	// updateCourse = (e) => {
	// 	// console.log('will update Course')
	// 	e.preventDefault()
	// 	const form = e.target;
	// 	// let btn_obj = $(this);
	// 	// btn_obj.text('Please Wait...').prop('disabled', true);
	// 	this.setState({...this.state, loading: true})
	// 	let formData = new FormData();

	// 	for(let field in this.state.course){
	// 		formData.append(field, this.state.course[field]);
	// 	}
	// 	formData.append('course_id',this.state.course?.id)
	// 	formData.append('selected_upsells', this.state.course?.selected_upsells?.join(','))
	// 	formData.append('selected_bundel_courses', this.state.course?.selected_bundel_courses?.join(','))

	// 	formData.append('course_image', this.state.promo.image.file)
	// 	formData.append('course_video', this.state.promo.video.file)

	// 	// console.log(this.state.course)
	// 	axios.post(this.state.urls.saveCourse, formData)
	// 	.then(res => {
	// 		if( res?.data?.course?.id ){
	// 			let {course, promo, video} = this.state;

	// 			course = {...course, ...(res?.data?.course || {})}
	// 			promo = { image: {...promo.image, file: null}, video: {...promo.video, file: null} }
	// 			video = res.data?.video || video
	// 			this.setState({...this.state, course, promo, video})
	// 			toastr.success('Course details updated.')
	// 		}else{
	// 			toastr.error('Error updating course info, please try again in a moment.')
	// 		}
	// 	})
	// 	.catch(e => {
	// 		console.log(e)
	// 	})
	// 	.finally(e => {
	// 		// console.log(e)
	// 		this.setState({...this.state, loading: false})
	// 	})
	// }

	render() {
		return (
			<CourseContext.Provider value={this.state}>
				{this.state.course?.id ? <>
					{this.props.children}
				</> : <div className="course-info-loader">
					{/* <RiLoader3Fill /> */}
                    <strong>Loading Data....</strong>
					</div>}
			</CourseContext.Provider>
			)
		}
	}

	export {CourseContext, CourseContextProvider};
