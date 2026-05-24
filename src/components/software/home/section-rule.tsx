// Shared section header rule: monospace number, hairline, uppercase tag.

export function SectionRule({ num, tag }: { num: string; tag: string }) {
    return (
        <div className="section-rule">
            <span className="section-rule__num">{num}</span>
            <div className="section-rule__line" />
            <span className="section-rule__tag">{tag}</span>
        </div>
    );
}
