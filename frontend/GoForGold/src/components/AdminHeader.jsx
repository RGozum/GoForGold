import SearchIcon from '../assets/search.svg';

export default function AdminHeader() {
    return <nav className="nav">
        <ul>
            <li>
             <a href ="/adminpanel">Admin Panel</a>
             <a href="/honorroll">Honor Roll</a>
             <a href="/accountcreation">Account Creation</a>


             <div className = 'menu-container'>
                <div className='menu-trigger'>
                    <img src={SearchIcon} className='search'></img>
                </div>
             </div>

             <div className='dropdown-menu'>
                <h3>Log Out</h3>
            </div>

            </li>
        </ul>
        </nav>

}
