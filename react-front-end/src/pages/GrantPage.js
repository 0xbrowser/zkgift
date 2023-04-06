import Navigation from '../components/Navigation';
import Grant from '../components/Grant';
import Bottom from '../components/Bottom';

function GrantPage({ accounts, setAccounts, network, setNetwork }) {
  return (
    <>
      <div className="GrantPage">
        < Navigation accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Grant accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Bottom network={network} setNetwork={setNetwork} />
      </div>
    </>
  );
}

export default GrantPage;