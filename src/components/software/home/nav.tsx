// Top nav with theme toggle.

import { LogoMark } from "./logo";
import { Icon } from "./icons";

type Theme = "light" | "dark";

export function Nav({
    theme,
    setTheme,
}: {
    theme: Theme;
    setTheme: (t: Theme) => void;
}) {
    return (
        <header className="nav">
            <div className="wrap nav__inner">
                <a href="#top" className="nav__logo">
                    <LogoMark size={28} animated />
                    <span>vestvisuals</span>
                    <span className="kbd" style={{ marginLeft: 4 }}>v3.2</span>
                </a>
                <nav className="nav__links">
                    <a href="#services">Services</a>
                    <a href="#work">Work</a>
                    <a href="#process">Process</a>
                    <a href="#stack">Stack</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#faq">FAQ</a>
                </nav>
                <div className="nav__right">
                    <button
                        className="theme-toggle"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="toggle theme"
                        title={theme === "dark" ? "switch to light" : "switch to dark"}
                    >
                        {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
                    </button>
                    <a href="#contact" className="btn btn--primary btn--arrow">
                        Start a project <Icon.Arrow />
                    </a>
                </div>
            </div>
        </header>
    );
}
