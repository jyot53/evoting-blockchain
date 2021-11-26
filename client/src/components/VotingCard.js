import React from "react";
import "../votingcard.css";

const VotingCard = React.forwardRef( (props,ref) => {
  console.log(props);
  return (
    <div className="credit-card-wrap" ref={ref}>
      <div className="mk-icon-world-map"></div>
      <div className="credit-card-inner">
        <header className="header">
          <div className="credit-logo">
            <span className="text">Vote-Chain</span>
          </div>
        </header>
        <div className="mk-icon-sim"></div>
        <div className="credit-font credit-card-number">
          {props.address}
          {/* 0xab830e883372887b971f71E8Fb09afC01A491253 */}
        </div>
        <footer className="footer">
          <div className="clearfix">
            <div className="pull-left">
              <div className="credit-font credit-author">
                {props.name}
                </div>
              <div className="credit-font credit-author">
                {props.email}
              </div>
              {/* <div className="credit-font credit-author">
                Age : 
                {props?.age}
              </div> */}
            </div>
            <div className="pull-right">
              <div className="mk-icon-visa"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} ) ;
// "To print a functional component ensure it is wrapped with `React.forwardRed`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"
export default VotingCard;
