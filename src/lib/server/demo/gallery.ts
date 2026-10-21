/**
 * Demo data for the galleries until the backend is there: every photo of the live portfolio bucket.
 * TODO: replace with the portfolio and albums from the database; only `src/functions/{portfolio,albums}.ts` read this.
 */
import { youtubeItem } from "@shared/gallery";
import type { GalleryItem } from "@shared/gallery";

/** id, width and height of the "small" variant (360px on the short side), and the category's tag */
const photos: [string, number, number, string][] = [
    ["a3zmgxetb5n6r8sl5jnc87hz", 540, 360, "majorat"],
    ["a8rm9fhczl4px321ladxwrft", 540, 360, "sedinta-foto"],
    ["ai58glsy37302v3xtdndi485", 540, 360, "sedinta-foto"],
    ["ap4odtdq7pcy2o02g8l9mvmg", 540, 360, "imobiliare"],
    ["b4dwo04rs8ta7na0zzbflpuv", 540, 360, "majorat"],
    ["b7d7izmbh1grybtl5nw1pg25", 540, 360, "sedinta-foto"],
    ["bh5gy83n71y2gmdc3kjzwj55", 360, 540, "auto"],
    ["bhh0mhwgdr63vubt0q0bisy0", 540, 360, "sedinta-foto"],
    ["bkzd91of88img3kxycwpew4m", 540, 360, "promovare-afaceri"],
    ["bsokixwj4nohuzkntrzsb7mu", 540, 360, "auto"],
    ["bufx0duqpa13cgbsowldzuqh", 540, 360, "majorat"],
    ["bwkb2xnt4aiduxqkahyw72om", 540, 360, "sedinta-foto"],
    ["byxc8rnhrr6zxfz8jspodhxr", 360, 540, "sedinta-foto"],
    ["cex7ft567q323pta45n1wzwj", 540, 360, "promovare-afaceri"],
    ["crwfqiut2htcyps7zycwy93z", 540, 360, "majorat"],
    ["ctqwipkk1927k8sa55hyodbd", 540, 360, "auto"],
    ["da1fvnn2sg9ahfruccmbw880", 540, 360, "majorat"],
    ["dafy5npxf0li1130hhap5tvo", 360, 540, "sedinta-foto"],
    ["dl07n8adsot5whobspse96kv", 540, 360, "imobiliare"],
    ["dmuxpsnbjm77rlh8drcajm4k", 360, 540, "majorat"],
    ["dozugwupvkafsmnpxtsc55f7", 540, 360, "majorat"],
    ["dsgepdx63zzvfsn3rseqwxdu", 360, 540, "sedinta-foto"],
    ["dt7mzcjz78dbu4v5ja4mdd4d", 540, 360, "imobiliare"],
    ["e0mfa97uwfitoopg8une8aln", 540, 360, "sedinta-foto"],
    ["e3ccw307ewz9f2ilu6akizbp", 540, 360, "promovare-afaceri"],
    ["e9c0u077v07c7vcvuqwlwsq5", 540, 360, "majorat"],
    ["edxehljl77ssdkxq9nw9gqx5", 540, 360, "majorat"],
    ["ei4wgqfn1br4pvd3tcx725ts", 540, 360, "sedinta-foto"],
    ["ekswpbjy5ev6bwobs0fvrgvi", 360, 540, "sedinta-foto"],
    ["enr3qepjk5vqijs1zhc1ya0c", 540, 360, "majorat"],
    ["eoeuwr98zlfq3qftcfjg50t8", 540, 360, "auto"],
    ["epxoe71263xjtdpt0995r791", 360, 540, "sedinta-foto"],
    ["eqygagj92tpaypfq3ir5m453", 360, 540, "sedinta-foto"],
    ["exnvnhpdv6c1fmdg9f20c982", 540, 360, "sedinta-foto"],
    ["f64uxutmybs9iuc08j1cp73y", 540, 360, "imobiliare"],
    ["f74n8neo4d5pa76uzat0tq2t", 360, 540, "sedinta-foto"],
    ["fddwfkitvk2wfxmrsmyoujzf", 540, 360, "majorat"],
    ["fdzri9f4ftg05fa5z8hbuyis", 540, 360, "promovare-afaceri"],
    ["fi96lz4row1wzo9mkk3im1m2", 540, 360, "imobiliare"],
    ["fjreqcarr7ajr8awzd9muzg9", 540, 360, "imobiliare"],
    ["fn2hug7gz8m1we4s6r3dtkwx", 540, 360, "auto"],
    ["frpxapc4wuy0dqlweorn0jjz", 540, 360, "promovare-afaceri"],
    ["ft4m6knleu1s6a0vm3z92qli", 360, 540, "sedinta-foto"],
    ["fvynavyyis2x04q8zdnjqam0", 540, 360, "auto"],
    ["g5hl7pydaqsn9rhgim0ieaeq", 540, 360, "majorat"],
    ["gbzqoohpwpnk7o6j204fax54", 540, 360, "majorat"],
    ["gqp1jpz57juan930jx02558d", 540, 360, "imobiliare"],
    ["gtz9i2guipeuyvnrkla38t0w", 540, 360, "majorat"],
    ["gu14clr3ac3nv05vtrnmiyuv", 540, 360, "sedinta-foto"],
    ["gwkrr9zsi079ict5jjmfqgfm", 540, 360, "majorat"],
    ["h0mbepdrz7ezs0eu7jy2mao1", 540, 360, "imobiliare"],
    ["h89rqrb43pv4i65358pehe2t", 540, 360, "majorat"],
    ["hctwn73n6xqemwlv866w4hn1", 360, 540, "majorat"],
    ["hfw2uxtqn1uuw0xum798y46w", 540, 360, "imobiliare"],
    ["hhixyez5bopnj835rp5fbuso", 360, 540, "majorat"],
    ["hkxv65vqfk1a1ba438i5fucm", 540, 360, "imobiliare"],
    ["hwktjt5gmgoefmt69q3fckiv", 540, 360, "imobiliare"],
    ["ib5okfz0kvgn4v9zw4due0oo", 360, 540, "imobiliare"],
    ["itq58kzqvyl1zpo1lzdsnriq", 540, 360, "majorat"],
    ["j16f2upfsfivprmi3m0skahs", 360, 540, "sedinta-foto"],
    ["js9kml59x0vfv3eh1o4m1vc3", 540, 360, "auto"],
    ["jsiq1gpcwa49ypt1g89xqigr", 540, 360, "majorat"],
    ["k1f64rluoe59axscrmr065c9", 540, 360, "imobiliare"],
    ["k27q7wwqchuwxn1kx94cr3zk", 540, 360, "majorat"],
    ["k56f6udi3fvbvvzniontxse0", 360, 540, "sedinta-foto"],
    ["k5f9yjcv39w3cnohlfd224iu", 540, 360, "auto"],
    ["kci4tsjlnm3l5kywact8srbd", 540, 360, "promovare-afaceri"],
    ["kjwe4od3o9ouk5seolk86j9k", 540, 360, "auto"],
    ["kvq3avj0a9qr4s0tpse9s1zk", 360, 540, "sedinta-foto"],
    ["kzkfmeyvndgaifaawvovzcvj", 540, 360, "auto"],
    ["l1xhekvxbakado1gh18v7ged", 540, 360, "sedinta-foto"],
    ["l6ywi1xpp0uvnifctunp7fja", 540, 360, "majorat"],
    ["l80gztc0uljicevwrh615f6u", 540, 360, "majorat"],
    ["l94rm7gbqr9qhdqf9nmq0vxe", 540, 360, "sedinta-foto"],
    ["lccacqbntvcqc1laix9cpa8g", 540, 360, "promovare-afaceri"],
    ["ld3awxiidb60yu23f4lky94y", 360, 540, "majorat"],
    ["lnhptopmh7v79pix5cwsyq29", 540, 360, "auto"],
    ["lzngifsvih3ude8p2nvp5xun", 540, 360, "imobiliare"],
    ["m3u1fne49flwng97jamw3avp", 360, 540, "majorat"],
    ["m4nxl83v9pg7p1n8llui72lk", 540, 360, "sedinta-foto"],
    ["mftdtswy99fp8flrmukc63k5", 360, 540, "imobiliare"],
    ["mkn0836z5wfacioyzf2su0pr", 360, 540, "sedinta-foto"],
    ["mpe0vflt46cjvrqgs8zj4xj8", 540, 360, "auto"],
    ["mwrrevu49xcbl9u5bjhrj1z9", 540, 360, "imobiliare"],
    ["mzcg9z2hcjuvgme1i6qe7fhv", 540, 360, "promovare-afaceri"],
    ["mztov3s0lsirgx4d7mi8xrmd", 540, 360, "majorat"],
    ["n0uufkq8r19fzokemh5ngzk1", 540, 360, "majorat"],
    ["n5ries5vyhou65bf7niuuwvm", 360, 540, "sedinta-foto"],
    ["necaz3yliu4sj2qmazw2gju4", 540, 360, "sedinta-foto"],
    ["neq2t1hp90l48qgzj6trl39v", 540, 360, "sedinta-foto"],
    ["njf8ahqlt62q2twbox8nckhf", 540, 360, "imobiliare"],
    ["nvbvaqfmpz83bm3ningjbb48", 540, 360, "imobiliare"],
    ["o8pbfvwrhhifznwin2mqip23", 540, 360, "promovare-afaceri"],
    ["oehkjln0kk3enqw6esnoh5ak", 540, 360, "imobiliare"],
    ["ok1f6eurgum0dnwollokpqzv", 540, 360, "auto"],
    ["ood3934n57msre4e147b506g", 540, 360, "sedinta-foto"],
    ["owe37o30986641u28zrtiapj", 540, 360, "majorat"],
    ["owqrg3r7p0dqqex542wdqjok", 540, 360, "auto"],
    ["p29lyxnpzp002c2bgxpwvrxj", 540, 360, "sedinta-foto"],
    ["pitp9mdyptivtycduovl3s01", 360, 540, "imobiliare"],
    ["ppfb339bbxw3wneifr39pfkx", 540, 360, "sedinta-foto"],
    ["ptt94fdy8m823sq1zi9nwngs", 540, 360, "majorat"],
    ["q7i8u1lxg99oz8gi5o0sz6m5", 540, 360, "majorat"],
    ["q83e5vlvmpw2pf1doi6k4hsl", 360, 540, "sedinta-foto"],
    ["qeig0bdkql9y4mjm88tk1eln", 540, 360, "sedinta-foto"],
    ["qfakbwm8pzaixlpjeoobtrfg", 360, 540, "imobiliare"],
    ["qges3u6jau9uw3gh1i76g9t4", 540, 360, "majorat"],
    ["qoe5qpfxti6wtquliusa2oi1", 540, 360, "auto"],
    ["qsplcccqitu5w78daes3i6ks", 540, 360, "promovare-afaceri"],
    ["qyko3rjjfg14yjhvs2l45wck", 540, 360, "majorat"],
    ["r1azn344ivqkpgv5y9f9tklz", 360, 540, "promovare-afaceri"],
    ["ra4271s6zj8ls5fma0y9rc2a", 540, 360, "auto"],
    ["rl59bib2n7xhpmw0jy2ag45p", 540, 360, "promovare-afaceri"],
    ["rltxbpec12w8unl8ci2zd4cw", 540, 360, "sedinta-foto"],
    ["s9izbjl5t4rvdjanoonj8jyp", 540, 360, "promovare-afaceri"],
    ["sbu90hbascm4j73ekyh7g3tt", 360, 540, "imobiliare"],
    ["scxshfgur7e7j4ndoxbprb7x", 540, 360, "auto"],
    ["seajnnjl9fh5a8sfwaxrprah", 540, 360, "auto"],
    ["sjomid6rb8p3c35vnz6gdd62", 540, 360, "auto"],
    ["sl7uio1tswjdf7des9zjv79p", 360, 540, "sedinta-foto"],
    ["souxitdl4uetnbvhm8cltvl3", 540, 360, "imobiliare"],
    ["ssrz35fag2hil9fwz2dvote1", 540, 360, "sedinta-foto"],
    ["t39tjmw4deax8iznxhzwp25j", 540, 360, "imobiliare"],
    ["t4wucz2w0479ct9gr80a58bp", 540, 360, "auto"],
    ["tp2e4xpmgdo71mx3q8ixtt0f", 540, 360, "sedinta-foto"],
    ["tuezrjoujv0hqvpbhydwt9k4", 540, 360, "auto"],
    ["u7c9qzxuwiy9qziofk0h1wwc", 540, 360, "majorat"],
    ["u9aai3o5ipfb9yi8psvli616", 360, 540, "majorat"],
    ["uabl3f0ndb4hby7tf428qj9e", 360, 540, "sedinta-foto"],
    ["ucr7wuiaju0ssg5pqgh4tin7", 540, 360, "imobiliare"],
    ["uhe1d8xkajzuzusvifj8ubv9", 360, 540, "sedinta-foto"],
    ["usjz26uuhmfq06lrgzr7fq7k", 360, 540, "majorat"],
    ["usn63kkxhhwngq4wtcra6zf5", 540, 360, "sedinta-foto"],
    ["v1wa6jyrg8t2u2pta03kj5ai", 540, 360, "majorat"],
    ["vf7rlu3zvz7yrjai7qsr7u1s", 360, 540, "majorat"],
    ["vknwv2uw2kxhvoyyyn326zx0", 360, 540, "auto"],
    ["vznmbjtg6w9lltk0uyr5ex2e", 540, 360, "promovare-afaceri"],
    ["w1673i5vxtansgtdj7jdn5e6", 360, 540, "sedinta-foto"],
    ["wmuz934kgdav1wu4mqa3e2he", 540, 360, "sedinta-foto"],
    ["wznos43vh1e55kdjs54ief0y", 540, 360, "majorat"],
    ["x2kp28ji45p8ms6qs1a7e2g6", 540, 360, "majorat"],
    ["x7nxyoz3hwdezu4tr33kb4gw", 540, 360, "majorat"],
    ["x8idtbzpqa2xebyhpz2n13jm", 360, 540, "sedinta-foto"],
    ["xezaxwbpwjrjg55qzsqeeje2", 540, 360, "promovare-afaceri"],
    ["xib1piv9vzgxi7ggobrfy9kw", 540, 360, "majorat"],
    ["xku47dpl4g4vorazvjfhdjjc", 540, 360, "auto"],
    ["xrja8xss5xpgf6ytj14rvcr0", 540, 360, "imobiliare"],
    ["y22m8ims1p6tskhke51hv827", 360, 540, "majorat"],
    ["y4g068yl6ce1o3bspivi5r5p", 540, 360, "imobiliare"],
    ["yda644hawj025z2o3kq8aaa9", 360, 540, "imobiliare"],
    ["yio20oo5vxfs18cxm925k3fy", 540, 360, "majorat"],
    ["ykm621t9sihpyw4dfwcvuupk", 540, 360, "auto"],
    ["yl2bc2u7cq6a0rnj38k0upxl", 360, 540, "sedinta-foto"],
    ["yl2hnnmb5037qfgzcg9lexzf", 540, 360, "majorat"],
    ["ynlsxofjehyfe4t5zg9n64pe", 540, 360, "sedinta-foto"],
    ["yu9eomg0ef4f66u2gpbqws4t", 540, 360, "majorat"],
    ["yvsdjoiv4whauw4m55pozyxj", 540, 360, "auto"],
    ["yyw40lbvqmnkmvn7asl6y8zt", 540, 360, "sedinta-foto"],
    ["z34362mh88we0urk97td85ax", 540, 360, "auto"],
    ["z42sd0lf54pzm9abaomt9ybb", 540, 360, "imobiliare"],
    ["z7n0zcsuxsuxxkjyu2fa9pav", 360, 540, "imobiliare"],
    ["z9rxpf53kdxhkfnjll7otrdn", 540, 360, "sedinta-foto"],
    ["z9shsh5ev7wpe1zj00bptld3", 540, 360, "majorat"],
    ["zbeskpwgoqs2kb8teesomexk", 540, 360, "majorat"],
    ["zh1nf0g7jzoienhhvpzz2b6n", 540, 360, "promovare-afaceri"],
    ["zl44kfles9dey0ka7sqmxspw", 540, 360, "auto"],
    ["zw0r605v9ojoglafuhfmf19a", 360, 540, "sedinta-foto"],
    ["zyq8z6ozp08dnoj2nwx9bgoj", 540, 360, "sedinta-foto"],
    ["zz9zwk8shj6zvb0esbwq3z0q", 540, 360, "auto"],
];

/** The bucket's variants, by their short side. */
const variants = [
    { tag: "small", short: 360 },
    { tag: "medium", short: 768 },
    { tag: "large", short: 1080 },
];

function toItem([id, width, height]: [string, number, number, string]): GalleryItem {
    const scale = (short: number) => short / Math.min(width, height);

    return {
        id,
        width: Math.round(width * scale(1080)),
        height: Math.round(height * scale(1080)),
        images: variants.map((variant) => ({
            url: `https://s3.vestvisuals.ro/portfolio/${id}/${variant.tag}`,
            width: Math.round(width * scale(variant.short)),
        })),
    };
}

/** The films from the YouTube channel. No files to download yet, so their download button is hidden. */
export const demoVideos = {
    majorat: ["vLQLTgv-dqQ", "953ua59KMpI", "5_BPExWuqbw", "AVYOEJPqSLE"].map((id) => youtubeItem(id)),
    auto: ["B-ux-8z8_XA", "A_ZocO4YCdI"].map((id) => youtubeItem(id)),
};

/** The portfolio categories, by tag, the way the admin's categories page lists them. */
export const demoCategories = ["nunta", "botez", "majorat", "sedinta-foto", "imobiliare", "auto", "promovare-afaceri"];

/** Every photo, in the bucket's order. */
export const demoPhotos: GalleryItem[] = photos.map(toItem);

/** A category's photos, with its films mixed in. Weddings and christenings have none yet. */
export function demoCategoryMedia(tag: string): GalleryItem[] {
    const media = photos.filter((photo) => photo[3] === tag).map(toItem);
    const videos: GalleryItem[] = tag in demoVideos ? demoVideos[tag as keyof typeof demoVideos] : [];
    videos.forEach((video, index) => media.splice(2 + index * 9, 0, video));
    return media;
}

/** One page of a list, the way the database will page it: `cursor` is the offset. */
export function demoPage(items: GalleryItem[], cursor: number, size: number) {
    const next = cursor + size;
    return { items: items.slice(cursor, next), nextCursor: next < items.length ? next : null };
}
