// Team row — editorial, alternating photo side. Ported from pages.jsx.

import { type Lang, type TeamMember } from "./data";
import { Icon } from "./icons";

export function TeamCard({
    member,
    idx,
    total,
    lang,
}: {
    member: TeamMember;
    idx: number;
    total: number;
    lang: Lang;
}) {
    const m = member;
    const flip = idx % 2 === 1 ? "1" : "0";
    return (
        <article className="team-row" data-flip={flip} data-accent={m.accent}>
            <div className="tr-photo">
                <img src={m.img} alt={`${m.first} ${m.last}`} loading="lazy" />
                <div className="tr-photo-cap">
                    <span className="city">{m.city}</span>
                    <span className="since">{lang === "ro" ? "din" : "since"} {m.since}</span>
                </div>
            </div>
            <div className="tr-meta">
                <div className="tr-index">
                    <span className="ix">No. 0{idx + 1} / 0{total}</span>
                    <span className="ln" />
                    <span>{m.accent === "teal" ? "Video lead" : (lang === "ro" ? "Foto lead" : "Photo lead")}</span>
                </div>
                <h3 className="tr-name">
                    {m.first}<br />
                    <span className="last">{m.last}</span>
                </h3>
                <p className="tr-role">{m[lang].role}</p>
                <p className="tr-bio">{m[lang].bio}</p>
                <div className="tr-foot">
                    <div className="specs">
                        {m.specs[lang].map((s) => <span key={s}>{s}</span>)}
                    </div>
                    <a className="ig-link"
                        href={`https://instagram.com/${m.ig}`}
                        target="_blank" rel="noreferrer">
                        <Icon.instagram /> @{m.ig}
                    </a>
                </div>
            </div>
        </article>
    );
}
