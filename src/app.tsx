import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DuplicateCleanup from './pages/DuplicateCleanup';
import JobApplyer from './pages/JobApplyer';

import WithBackButton from './components/WithBackButton';

// import DuplicateFilesCleanup from './modules/DuplicateFilesCleanup';
// import JobApplyer from './modules/JobApplyer';
// import ClipboardAccess from './modules/ClipboardAccess';
// import SetupEnvironments from './modules/SetupEnvironments';
// import PictureGenerator from './modules/PictureGenerator';

const App = () => {
    const DuplicateCleanupWithBackButton = WithBackButton(DuplicateCleanup);
    const JobApplyerWithBackButton = WithBackButton(JobApplyer);

    return (
        <Router>
            {/* <Dashboard/> */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/duplicate-cleanup" element={<DuplicateCleanupWithBackButton/>} />
                <Route path="/job-applyer" element={<JobApplyerWithBackButton />} />
                <Route path="/clipboard-access" element={<br></br>} />
                <Route path="/setup-environments" element={<br></br>} />
                <Route path="/picture-generator" element={<br></br>} />
            </Routes>
        </Router>
    );
};

export default App;
