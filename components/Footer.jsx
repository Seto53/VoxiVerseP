const navigation = [
    {
        name: "Terms",
        href: "/terms",
    },
    {
        name: "Privacy",
        href: "/privacy",
    },
    {
        name: "Support",
        href: "/support",
    },
];

const Footer = () => {
    return (
        <footer>
            <div
                className="border-t border-noble-black-600 mx-auto max-w-7xl p-6 flex
            flex-col sm:flex-row items-center justify-between text-font-m"
            >
                <div className="text-center sm:mb-0 sm:text-left">
                    <p className="text-noble-black-400 py-[3.6px]">&copy; 2023 VoxiVerse</p>
                </div>
                <div className="hidden sm:flex justify-center space-x-3">
                    {navigation.map(item => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-noble-black-400 hover:text-noble-black-300
                        hover:underline"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
