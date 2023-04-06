import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Bottom from '../components/Bottom';

function HomePage({ accounts, setAccounts, network, setNetwork }) {
  return (
    <>
      <div className="HomePage">
        < Navigation accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Home accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Bottom network={network} setNetwork={setNetwork} />
      </div>
    </>
  );
}

export default HomePage;