import { useHistory } from 'react-router-dom';

import { Button } from './Button';
import { InfoBox } from './InfoBox';

export function PageError() {
  const history = useHistory();

  return (
    <InfoBox
      title="🤔 Something went wrong"
      text="Please reload the page or try again later."
      button={
        <Button
          className="w-[195px]"
          iconLeftName="refresh"
          onClick={() => history.go(0)}
        >
          Reload page
        </Button>
      }
    />
  );
}
