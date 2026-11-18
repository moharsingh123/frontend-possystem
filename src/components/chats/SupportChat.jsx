import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Paperclip, Send, X } from "lucide-react";
import api from "../../utils/api";
import "./SupportChat.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILES = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp";

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [visitor, setVisitor] = useState(null);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState("");
    const messageEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    function startChat(event) {
        event.preventDefault();
        const name = contact.name.trim();
        const email = contact.email.trim();
        const phone = contact.phone.trim();

        if (!name) {
            setError("Please enter your name.");
            return;
        }
        if (Boolean(email) === Boolean(phone)) {
            setError("Enter either an email address or a phone number.");
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (phone && (!/^\+?[\d\s()-]{7,20}$/.test(phone) || phone.replace(/\D/g, "").length < 7)) {
            setError("Please enter a valid phone number.");
            return;
        }

        setVisitor({ name, email, phone });
        setMessages([{
            role: "assistant",
            content: `Hi ${name}! Ask me about POS Pro services, using and managing your store, or using POS Pro reports and inventory tools to support business growth. I can only answer from the POS Pro information I have. Attachments are sent to our team for review and are not read by the chatbot.`,
        }]);
        setError("");
    }

    function selectAttachment(event) {
        const file = event.target.files?.[0] ?? null;
        if (file && file.size > MAX_FILE_SIZE) {
            setError("Attachments must be 5 MB or smaller.");
            event.target.value = "";
            return;
        }
        setAttachment(file);
        setError("");
    }

    async function sendMessage(event) {
        event.preventDefault();
        const question = draft.trim();
        if (!visitor || !question || isSending) return;

        setMessages((current) => [
            ...current,
            { role: "user", content: question, attachmentName: attachment?.name },
        ]);
        setIsSending(true);
        setError("");

        const formData = new FormData();
        formData.append("name", visitor.name);
        formData.append("message", question);
        formData.append("history", JSON.stringify(messages.slice(-12).map(({ role, content }) => ({ role, content }))));
        if (visitor.email) formData.append("email", visitor.email);
        if (visitor.phone) formData.append("phone", visitor.phone);
        if (attachment) formData.append("attachment", attachment);

        try {
            const response = await api.post("/api/public/chat", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessages((current) => [
                ...current,
                { role: "assistant", content: response.data.answer },
            ]);
            setDraft("");
            setAttachment(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (requestError) {
            const serverMessage = requestError.response?.data?.detail
                || requestError.response?.data?.message
                || "I couldn't send that message just now. Please try again.";
            setMessages((current) => [
                ...current,
                { role: "assistant", content: serverMessage },
            ]);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="support-chat">
            {isOpen && (
                <section className="support-chat__panel" aria-label="POS Pro customer support chat">
                    <header className="support-chat__header">
                        <span className="support-chat__avatar"><Bot size={20} /></span>
                        <div>
                            <strong>POS Pro support</strong>
                            <span>Here to help with your store</span>
                        </div>
                        <button className="support-chat__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <X size={19} />
                        </button>
                    </header>

                    {!visitor ? (
                        <form className="support-chat__contact" onSubmit={startChat}>
                            <h2>Let’s get started</h2>
                            <p>Share your name and one way for our team to reach you.</p>
                            <label>
                                Your name
                                <input
                                    autoComplete="name"
                                    maxLength={100}
                                    value={contact.name}
                                    onChange={(event) => setContact({ ...contact, name: event.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Email address <span>(optional)</span>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    maxLength={254}
                                    value={contact.email}
                                    onChange={(event) => setContact({ ...contact, email: event.target.value, phone: "" })}
                                />
                            </label>
                            <label>
                                Phone number <span>(optional)</span>
                                <input
                                    type="tel"
                                    autoComplete="tel"
                                    maxLength={20}
                                    value={contact.phone}
                                    onChange={(event) => setContact({ ...contact, phone: event.target.value, email: "" })}
                                />
                            </label>
                            <p className="support-chat__privacy">
                                We use your contact details only for this chat and any support follow-up you request.
                            </p>
                            {error && <p className="support-chat__error" role="alert">{error}</p>}
                            <button className="support-chat__primary" type="submit">Start chat</button>
                        </form>
                    ) : (
                        <>
                            <div className="support-chat__messages" role="log" aria-live="polite" aria-label="Chat messages">
                                {messages.map((item, index) => (
                                    <div className={`support-chat__message support-chat__message--${item.role}`} key={`${index}-${item.role}`}>
                                        {item.role === "assistant" && <span className="support-chat__message-icon"><Bot size={15} /></span>}
                                        <p>{item.content}{item.attachmentName && <small>Attached: {item.attachmentName}</small>}</p>
                                    </div>
                                ))}
                                {isSending && <p className="support-chat__typing">POS Pro support is replying…</p>}
                                <div ref={messageEndRef} />
                            </div>
                            <form className="support-chat__composer" onSubmit={sendMessage}>
                                {attachment && (
                                    <div className="support-chat__file">
                                        <span>{attachment.name}</span>
                                        <button type="button" onClick={() => {
                                            setAttachment(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }} aria-label="Remove attachment">Remove</button>
                                    </div>
                                )}
                                {error && <p className="support-chat__error" role="alert">{error}</p>}
                                <div className="support-chat__input-row">
                                    <input
                                        aria-label="Your message"
                                        maxLength={2000}
                                        placeholder="Ask a POS Pro question…"
                                        value={draft}
                                        onChange={(event) => setDraft(event.target.value)}
                                    />
                                    <input
                                        ref={fileInputRef}
                                        className="support-chat__file-input"
                                        type="file"
                                        accept={ACCEPTED_FILES}
                                        onChange={selectAttachment}
                                        aria-label="Attach a document or screenshot"
                                    />
                                    <button
                                        className="support-chat__icon-button"
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        aria-label="Attach a document or screenshot"
                                        disabled={isSending}
                                    >
                                        <Paperclip size={18} />
                                    </button>
                                    <button className="support-chat__send" type="submit" disabled={!draft.trim() || isSending} aria-label="Send message">
                                        <Send size={17} />
                                    </button>
                                </div>
                                <small>PDF, DOC, DOCX, TXT, PNG, JPG or WEBP up to 5 MB. Files are forwarded to the support team.</small>
                            </form>
                        </>
                    )}
                </section>
            )}
            <button
                className="support-chat__launcher"
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close POS Pro support chat" : "Open POS Pro support chat"}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={23} /> : <MessageCircle size={23} />}
                {!isOpen && <span>Chat with us</span>}
            </button>
        </div>
    );
}