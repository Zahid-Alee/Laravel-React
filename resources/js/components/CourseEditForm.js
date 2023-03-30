import React, { useContext, useState } from 'react';
import {CourseContext} from '../CourseContext'

import Sidebar from './Sidebar'
import BasicInfo from './tabs/BasicInfo'
import Overview from './tabs/Overview'
import Promo from './tabs/Promo'
import Pricing from './tabs/Pricing'
import Contributors from './tabs/Contributors'
import Curriculum from './tabs/Curriculum'
import Upsells from './tabs/Upsells'
import Bundled from './tabs/Bundled'
// import Preview from './tabs/Preview'

const Tabs = {
    'Basic Info' : <BasicInfo/>,
    'Overview' : <Overview/>,
    'Promo Image/Video' : <Promo/>,
    'Curriculum' : <Curriculum/>,
    'Pricing' : <Pricing/>,
    'Contributors': <Contributors/>,
    'Upsells Courses' : <Upsells/>,
    'Bundle Options' : <Bundled/>,
    // 'Preview & Publish' : <Preview/>,
}

export default function CourseEditForm(props) {
    const [tab, setTab] = useState('Basic Info')
    // const [tab, setTab] = useState('Curriculum')
    let context = useContext(CourseContext)

    const preventSubmit = e => {
        if(e.key == 'Enter' || e.keyCode ==  13){

            console.log('you have pressed the enter key ');
            e.preventDefault()
        }
    }
    return (
        <>{console.log('hello forom the course edit form')}
            {/* <div className="border py-4 p-0 pr-4">
                <form method="POST" className="courseForm" onSubmit={context.updateCourse} onKeyDown={preventSubmit}>
                    <div className="row mr-0">
                        <div className="site-menubar-body col-md-2 pr-0">
                            <Sidebar tabs={Tabs} activeTab={tab} setTab={setTab}/>
                        </div>
                        <div className="panel col-md-10 pb-0 mb-0">
                            <div className="panel-body">
                                <div className="tab-content" id="nav-tabContent">
                                   {Tabs[tab]}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> */}

            <div>
                <form method='POST' className='courseForm' onSubmit={context.updateCourse} onKeyDown={preventSubmit}> 
                <div className="menuBar">
                    <Sidebar tabs={Tabs} activeTab={tab} setTab={setTab} />
                </div>
                <div className="panelBody" style={{border:'2px solid black'}}>
                <div className="tab-content" id="nav-tabContent">
                {Tabs[tab]} </div>
                </div>
                </form>
            </div>
        </>
    );
}