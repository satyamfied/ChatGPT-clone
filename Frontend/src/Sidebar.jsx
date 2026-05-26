import "./Sidebar.css";

function Sidebar() {
    return (
        <section className="sidebar">
            {/* New Chat Button */}
            <button>
                <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo"></img>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {/* History */}
            <ul className="history">
                <li>Thread1</li>
                <li>Thread2</li>
                <li>Thread3</li>
            </ul>

            {/* Sign */}
            <div className ="sign">
                <p>Made by Satyam Kumar</p>
            </div>
        </section>
    )
}

export default Sidebar;