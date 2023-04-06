import Navigation from '../components/Navigation';
import Rank from '../components/Rank';
import Bottom from '../components/Bottom';

function RankPage({ accounts, setAccounts, network, setNetwork }) {
  return (
    <>
      <div className="RankPage">
        < Navigation accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Rank accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />
        < Bottom network={network} setNetwork={setNetwork} />
      </div>
    </>
  );
}

export default RankPage;