// Footer.

import { LogoMark } from "./logo";

export function Footer() {
    return (
        <footer className="foot">
            <div className="wrap">
                <div className="foot__top">
                    <div className="foot__brand">
                        <div className="nav__logo" style={{ marginBottom: 12 }}>
                            <LogoMark size={32} />
                            <span>vestvisuals</span>
                        </div>
                        <p>
                            A small engineering studio. We design, build, and launch software that ships
                            on time, every time. Available worldwide; based in San Francisco and Lisbon.
                        </p>
                    </div>
                    <div className="foot__col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#services">Web apps</a></li>
                            <li><a href="#services">Mobile</a></li>
                            <li><a href="#services">Dashboards</a></li>
                            <li><a href="#services">AI / RAG</a></li>
                            <li><a href="#services">Design systems</a></li>
                        </ul>
                    </div>
                    <div className="foot__col">
                        <h4>Studio</h4>
                        <ul>
                            <li><a href="#about">Team</a></li>
                            <li><a href="#work">Work</a></li>
                            <li><a href="#process">Process</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#">Journal</a></li>
                        </ul>
                    </div>
                    <div className="foot__col">
                        <h4>Get in touch</h4>
                        <ul>
                            <li><a href="mailto:hello@vestvisuals.co">hello@vestvisuals.co</a></li>
                            <li><a href="#">@vestvisuals</a></li>
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">Read.cv</a></li>
                            <li><a href="#">RSS</a></li>
                        </ul>
                    </div>
                </div>

                <div className="foot__big">vestvisuals</div>

                <div className="foot__bottom">
                    <span>© 2026 vest visuals, llc — registered in delaware, usa</span>
                    <span>
                        <a href="#">privacy</a> · <a href="#">terms</a> · <a href="#">soc2</a>
                    </span>
                    <span>v3.2 · last updated 22 may 2026</span>
                </div>
            </div>
        </footer>
    );
}
