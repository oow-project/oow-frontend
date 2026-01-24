export const Footer = () => {
  return (
    <footer className="bg-oow-navy-900 flex flex-col items-center gap-2 px-6 py-4">
      <p className="text-oow-gray text-xs">
        OOW.GG was created for portfolio purposes. OOW.GG is not affiliated with or endorsed by
        Blizzard Entertainment. Overwatch 2 is a trademarks or registered trademarks of Blizzard
        Entertainment, Inc.
      </p>
      <div className="flex gap-2 text-sm">
        <a
          href="https://github.com/oow-project"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oow-gray"
        >
          GitHub
        </a>
        <span className="text-oow-gray">|</span>
        <a
          href="https://sour-woodwind-5c8.notion.site/2eda8895340c8020921adf2ccd653aa5"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oow-gray"
        >
          Notion
        </a>
      </div>
    </footer>
  );
};
