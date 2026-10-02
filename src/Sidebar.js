import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = ({isOpen , togglesidebar,closeSidebar}) => {


    
  return (
    <>    
    <button onClick={togglesidebar} className='toggle-btn'>
            {isOpen ? 'Close' : 'Open'} Sidebar
    </button>
    
    <div className={`sidebar ${isOpen ? 'open' :'closed' }`}>
        
        <nav>
            <ul>
                <li><Link to="/"><button onClick={closeSidebar}> Home </button> </Link></li>
                <li><Link to = '/dashboard'><button onClick={closeSidebar}> DashBoard </button></Link></li>
                <li><Link to = '/transactions'><button onClick={closeSidebar}> Transactions </button></Link></li>
                <li><Link to = '/reports'><button onClick={closeSidebar}> Reports </button></Link></li>
                <li><Link to = '/budgets'><button onClick={closeSidebar}> Budgets </button></Link></li>
                <li><Link to = '/settings'><button onClick={closeSidebar}> Settings </button></Link></li>
            </ul>
        </nav>

    </div>
    </>

  )
}

export default Sidebar