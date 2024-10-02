import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { CURRENCY_TYPE } from '@blocklet/launcher-util/lib/constant';
import { prettyDuration } from '@blocklet/launcher-util/lib/util';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import get from 'lodash.get';
import PropTypes from 'prop-types';

export default function NodeType({ data, selected, paymentMethod, ...props }) {
  const { locale } = useLocaleContext();

  return (
    <Container {...props} className={selected ? 'item-selected' : ''}>
      <Typography className="name" component="span">
        {`${get(data, `name.${locale}`)} (${prettyDuration(data.duration, locale)})`}
      </Typography>
      <div className="price">{data.prices[paymentMethod]}</div>
      <div className="rights">
        <ul className="rights-list">
          {data.features.map((feat) => (
            <li key={`${locale}-${feat[locale]}`}>
              <div className="item-block">
                <div className="item-desc">{feat[locale]}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="check-container">
        <CheckIcon className="check-icon" />
      </div>
    </Container>
  );
}

NodeType.propTypes = {
  data: PropTypes.object.isRequired,
  paymentMethod: PropTypes.string,
  selected: PropTypes.bool,
};

NodeType.defaultProps = {
  selected: false,
  paymentMethod: CURRENCY_TYPE.crypto,
};

const Container = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.palette.grey[200]};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition:
    background-color ease 0.2s,
    border ease 0.2s;

  &.item-selected {
    background-color: #ecfbfd;
    border-color: #ecfbfd;
    cursor: default;
  }

  .name {
    color: ${(props) => props.theme.palette.grey[900]};
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
  }

  .price {
    margin-top: 8px;
    font-size: 24px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.primary.main};
  }

  .rights {
    font-size: 14px;

    & > ul li {
      list-style-type: none;
      margin: 0;
      vertical-align: middle;
      color: ${(props) => props.theme.palette.grey[700]};
    }

    & > ul li:not(:first-of-type) {
      margin-top: 8px;
    }

    .rights-list {
      margin-top: 8px;
    }
  }

  .item-block {
    display: flex;
    .item-icon {
      margin-right: 6px;
      font-size: 14px;
      color: ${(props) => props.theme.palette.primary.main};
      flex-shrink: 0;
    }
    .item-desc {
      flex: 1;
    }
  }

  .check-container {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 30px;
    height: 30px;
    border-radius: 0 0 7px 0;
    color: ${(props) => props.theme.palette.common.white};
    overflow: hidden;
    transition: all ease 0.3s;
    &:after {
      position: absolute;
      z-index: 0;
      left: 30px;
      top: 30px;
      display: block;
      width: 0;
      height: 0;
      border-top: transparent solid 15px;
      border-left: transparent solid 15px;
      border-bottom: ${(props) => props.theme.palette.primary.main} solid 15px;
      border-right: ${(props) => props.theme.palette.primary.main} solid 15px;
      transition: all ease 0.1s;
      content: '';
    }

    .check-icon {
      position: relative;
      z-index: 2;
      margin: 0 1px 1px 0;
      font-size: 16px;
      transform: scale(0);
      transition: all ease 0.2s;
    }
  }

  &.item-selected {
    .check-container {
      &:after {
        left: 0;
        top: 0;
      }
      .check-icon {
        transform: scale(1);
      }
    }
  }
`;
