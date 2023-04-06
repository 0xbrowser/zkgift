import Navigation from '../components/Navigation';
import About from '../components/About';
import Bottom from '../components/Bottom';

function AboutPage({ accounts, setAccounts, network, setNetwork }) {
  return (
    <>
      <div className="AboutPage">
        < Navigation accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < About />
        < Bottom />
      </div>
    </>
  );
}

export default AboutPage;
