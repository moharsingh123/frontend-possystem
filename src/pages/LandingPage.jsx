import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Boxes,
    Camera,
    Check,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    CreditCard,
    GitBranch,
    Mail,
    Menu,
    ReceiptText,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    Sparkles,
    Store,
    UsersRound,
    X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import checkoutPhoto from "../assets/retail-checkout.webp";
import inventoryPhoto from "../assets/retail-inventory.webp";
import storePhoto from "../assets/retail-store.webp";
import "./LandingPage.css";

const copyrightYear = new Date().getFullYear();

const stories = [
    {
        eyebrow: "THE CASHIER WORKSPACE",
        title: "Keep the line moving. Keep customers smiling.",
        description: "A focused checkout for building orders, finding products, looking up customers, and recording payments — without the clutter.",
        image: checkoutPhoto,
        imageAlt: "Shop owner using a point-of-sale terminal to help a customer",
        icon: ShoppingCart,
        className: "story--checkout",
        points: ["Fast product search", "Customer lookup", "Order history and refunds"],
        note: "A friendlier checkout, from the first scan.",
    },
    {
        eyebrow: "PRODUCTS & INVENTORY",
        title: "Know what’s in stock, wherever you sell.",
        description: "Keep products and categories organized, follow inventory by branch, and spend less time chasing updates across locations.",
        image: inventoryPhoto,
        imageAlt: "Fresh products arranged on shelves in a grocery store",
        icon: Boxes,
        className: "story--inventory",
        points: ["Product and category management", "Branch-level inventory", "Clear store overview"],
        note: "A better view of what’s on the shelf.",
    },
    {
        eyebrow: "BRANCHES & TEAMS",
        title: "One connected view. Every store and shift.",
        description: "Give store teams and branch managers a workspace that fits their role, with the right information close at hand.",
        image: storePhoto,
        imageAlt: "Independent retail shop with clothing and products arranged on display",
        icon: GitBranch,
        className: "story--teams",
        points: ["Multi-branch operations", "Role-based employee access", "Shift summaries and sales analytics"],
        note: "The whole team, pulling in the same direction.",
    },
];

const capabilityList = [
    { icon: Store, label: "Store dashboard" },
    { icon: GitBranch, label: "Branches & inventory" },
    { icon: ShoppingCart, label: "Cashier checkout" },
    { icon: ReceiptText, label: "Orders & refunds" },
    { icon: UsersRound, label: "Customers & employees" },
    { icon: BarChart3, label: "Sales & shift reports" },
    { icon: Boxes, label: "Products & categories" },
    { icon: ShieldCheck, label: "Role-based workspaces" },
    { icon: CircleDollarSign, label: "Subscription plans" },
    { icon: UsersRound, label: "Store approvals & oversight" },
];

const plans = [
    {
        name: "Single store",
        summary: "A practical home base for an independent retailer.",
        features: ["Store profile & dashboard", "Products and categories", "Employee management", "Sales overview"],
    },
    {
        name: "Growing team",
        summary: "More visibility for busy teams and expanding operations.",
        features: ["Everything in Single store", "Branch and inventory workflows", "Cashier checkout & customer lookup", "Order, refund & shift reporting"],
        featured: true,
    },
    {
        name: "Multi-store",
        summary: "A tailored setup for larger retail operations.",
        features: ["Everything in Growing team", "Centralized store oversight", "Flexible team access", "Guided onboarding"],
    },
];

function Brand({ light = false }) {
    return (
        <a className={`brand${light ? " brand--light" : ""}`} href="#top" aria-label="POS Pro home">
            <span className="brand__mark"><ShoppingBag size={20} strokeWidth={2.2} /></span>
            <span>POS <strong>Pro</strong></span>
        </a>
    );
}

function CheckoutCard() {
    return (
        <div className="checkout-card" aria-label="Illustrative point-of-sale checkout preview">
            <div className="checkout-card__top">
                <span className="checkout-card__logo"><ShoppingBag size={15} /></span>
                <span><b>POS Pro</b><small>Checkout preview</small></span>
                <span className="checkout-card__status"><i /> Ready</span>
            </div>
            <div className="checkout-card__order"><span>Current order</span><b>03 items</b></div>
            <div className="checkout-card__item"><span className="checkout-card__product">01</span><span>Everyday essentials<small>Store item</small></span><b>₹ 480</b></div>
            <div className="checkout-card__item"><span className="checkout-card__product checkout-card__product--coral">02</span><span>Fresh market picks<small>Store item</small></span><b>₹ 320</b></div>
            <div className="checkout-card__total"><span>Order total</span><b>₹ 800</b></div>
            <div className="checkout-card__pay"><CreditCard size={15} /> Continue to payment <ArrowRight size={14} /></div>
        </div>
    );
}

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <main className="landing-page" id="top">
            <header className="landing-header">
                <div className="landing-container nav-shell">
                    <Brand />
                    <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
                        {menuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                    <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Main navigation">
                        <a href="#features" onClick={closeMenu}>Features <ChevronDown size={13} /></a>
                        <a href="#stories" onClick={closeMenu}>How it works</a>
                        <a href="#pricing" onClick={closeMenu}>Pricing</a>
                        <a href="#contact" onClick={closeMenu}>Contact</a>
                        <div className="nav-actions">
                            <Link className="nav-signin" to="/login" onClick={closeMenu}>Sign in</Link>
                            <Link className="button button--primary button--nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-900" to="/signup" onClick={closeMenu}>Get started <ArrowUpRight size={15} /></Link>
                        </div>
                    </nav>
                </div>
            </header>

            <section className="hero-section">
                <div className="landing-container hero-layout">
                    <div className="hero-content">
                        <a className="announcement" href="#features"><span className="announcement__spark"><Sparkles size={13} /></span> A better day at the counter starts here <ArrowRight size={13} /></a>
                        <h1>Your store,<br />all <span>in sync.</span></h1>
                        <p className="hero-copy">Take the busywork out of retail. POS Pro brings checkout, products, staff, and branches together in one clear workspace.</p>
                        <div className="hero-actions">
                            <Link className="button button--primary button--large focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-900" to="/signup">Create your account <ArrowRight size={17} /></Link>
                            <a className="button button--quiet button--large" href="#stories">See how it works <ArrowDown size={16} /></a>
                        </div>
                        <div className="hero-proof"><span className="proof-mark"><ReceiptText size={13} /></span><span>From the first order to the end-of-shift report.</span></div>
                        <div className="hero-points">
                            <span><Check size={14} /> Checkout</span>
                            <span><Check size={14} /> Inventory</span>
                            <span><Check size={14} /> Every branch</span>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-visual__halo" />
                        <div className="hero-photo-wrap"><img className="hero-photo" src={checkoutPhoto} alt="A shop owner completing a checkout with a customer" fetchPriority="high" /></div>
                        <div className="photo-tag"><span className="photo-tag__dot" /><span>THE EVERYDAY CHECKOUT<small>Designed for real store days</small></span></div>
                        <CheckoutCard />
                        <div className="hero-scribble" aria-hidden="true">✳</div>
                    </div>
                </div>
                <div className="hero-bottom landing-container">
                    <span>ONE POS FOR YOUR WHOLE OPERATION</span>
                    <div className="hero-roles">
                        <span><ShoppingCart size={16} /> Cashier</span>
                        <span><GitBranch size={16} /> Branch manager</span>
                        <span><Store size={16} /> Store admin</span>
                        <span><BarChart3 size={16} /> Business insights</span>
                    </div>
                </div>
            </section>

            <section className="stories-section" id="stories">
                <div className="landing-container">
                    <div className="section-heading">
                        <span className="section-kicker">THE TOOLS YOUR STORE NEEDS</span>
                        <h2>Less switching tabs.<br /><span>More good store days.</span></h2>
                        <p>From the counter to the back office, keep the important work connected.</p>
                    </div>
                    <div className="story-list">
                        {stories.map(({ eyebrow, title, description, image, imageAlt, icon: Icon, className, points, note }, index) => (
                            <article className={`story-card ${className}`} key={eyebrow}>
                                <div className="story-image-wrap">
                                    <img src={image} alt={imageAlt} loading="lazy" />
                                    <span className="story-image-note"><Icon size={15} /> {note}</span>
                                    <span className="story-index">0{index + 1}</span>
                                </div>
                                <div className="story-copy">
                                    <span className="section-kicker">{eyebrow}</span>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <ul>{points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
                                    <a className="text-link" href="#features">Explore the features <ArrowRight size={15} /></a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="feature-section" id="features">
                <div className="landing-container feature-section__inner">
                    <div className="feature-intro">
                        <span className="section-kicker">SMALL DETAILS. BIG DIFFERENCE.</span>
                        <h2>Everything your team needs.<br /><span>Nothing in the way.</span></h2>
                        <p>Move from checkout to close-of-shift with a connected set of tools for the way your store already works.</p>
                        <Link className="button button--light button--large focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" to="/signup">Take a closer look <ArrowUpRight size={16} /></Link>
                    </div>
                    <div className="capability-grid">{capabilityList.map(({ icon: Icon, label }) => <div key={label}><span><Icon size={18} /></span>{label}<ArrowUpRight size={14} /></div>)}</div>
                    <div className="feature-deco feature-deco--one" aria-hidden="true">✳</div>
                    <div className="feature-deco feature-deco--two" aria-hidden="true">✳</div>
                </div>
            </section>

            <section className="section pricing-section" id="pricing">
                <div className="landing-container">
                    <div className="section-heading section-heading--center">
                        <span className="section-kicker">PRICING THAT FITS YOUR STORE</span>
                        <h2>A good fit for <span>where you’re going.</span></h2>
                        <p>Tell us about your stores and your team. We’ll help put together a clear quote around the features you need.</p>
                    </div>
                    <div className="pricing-grid">
                        {plans.map((plan) => (
                            <article className={`pricing-card transition-all duration-300 hover:-translate-y-1${plan.featured ? " pricing-card--featured" : ""}`} key={plan.name}>
                                {plan.featured && <span className="popular-tag">For growing teams</span>}
                                <span className="pricing-name">{plan.name}</span>
                                <p>{plan.summary}</p>
                                <div className="pricing-amount"><strong>Let’s talk</strong><span>for a tailored quote</span></div>
                                <a className={`button ${plan.featured ? "button--primary" : "button--outline"} pricing-button`} href="#contact">Ask about this plan <ArrowRight size={15} /></a>
                                <span className="pricing-includes">A thoughtful setup includes</span>
                                <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
                            </article>
                        ))}
                    </div>
                    <p className="pricing-footnote"><CircleDollarSign size={16} /> No public rates are configured yet. Contact us for a clear, no-obligation quote.</p>
                </div>
            </section>

            <section className="cta-section">
                <div className="landing-container cta-card">
                    <div className="cta-copy"><span className="section-kicker">READY WHEN YOU ARE</span><h2>Let’s make your<br />next store day easier.</h2><p>Meet POS Pro and give your team a calmer way to run retail.</p></div>
                    <div className="cta-actions"><Link className="button button--primary button--large focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-900" to="/signup">Get started <ArrowRight size={17} /></Link><a href="#contact">Or talk with our team <ArrowUpRight size={15} /></a></div>
                    <span className="cta-art" aria-hidden="true">✳</span>
                </div>
            </section>

            <section className="contact-section" id="contact">
                <div className="landing-container contact-layout">
                    <div className="contact-intro">
                        <span className="section-kicker">REAL PEOPLE, READY TO HELP</span>
                        <h2>Let’s talk about<br /><span>your store.</span></h2>
                        <p>Questions about POS Pro, pricing, or setting up your team? Reach out directly to the owners.</p>
                        <a className="contact-email" href="mailto:mohar890singh@gmail.com"><Mail size={17} /> mohar890singh@gmail.com <ArrowRight size={15} /></a>
                    </div>
                    <div className="owner-cards">
                        <article className="owner-card"><span className="owner-initials">MS</span><div><span className="owner-role">OWNER</span><h3>Mohar Singh Yadav</h3><a href="tel:+919336057770">+91 93360 57770</a><a href="mailto:mohar890singh@gmail.com">mohar890singh@gmail.com</a></div><ArrowUpRight className="owner-arrow" size={17} /></article>
                        <article className="owner-card"><span className="owner-initials owner-initials--warm">RY</span><div><span className="owner-role">OWNER</span><h3>Rajeev Yadav</h3><a href="tel:+919140473654">+91 91404 73654</a><a href="mailto:rajeev7129@gmail.com">rajeev7129@gmail.com</a></div><ArrowUpRight className="owner-arrow" size={17} /></article>
                        <div className="contact-note"><Clock3 size={16} /><span>Questions about a plan? Get in touch for a personal reply.</span></div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="landing-container">
                    <div className="footer-main">
                        <div className="footer-brand"><Brand light /><p>Good retail starts with a little more clarity.</p></div>
                        <div className="footer-links"><span>EXPLORE</span><a href="#stories">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#contact">Contact us</a></div>
                        <div className="footer-links"><span>YOUR ACCOUNT</span><Link to="/login">Sign in</Link><Link to="/signup">Create an account</Link></div>
                        <div className="footer-social"><span>FOLLOW ALONG</span><div>
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17} /></a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-letter">f</a>
                            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" className="social-letter social-letter--x">𝕏</a>
                        </div><a className="footer-mail" href="mailto:rajeev7129@gmail.com"><Mail size={14} /> Say hello</a></div>
                    </div>
                    <div className="footer-bottom"><span>© {copyrightYear} POS Pro. Made for better store days.</span><a href="#top">Back to top ↑</a></div>
                </div>
            </footer>
        </main>
    );
}
