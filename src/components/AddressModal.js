import { useState, useEffect } from "react";
import Address from "./address";
import "../assets/address.scss";

const AddressModal = ({ close, putAddressView, allMemberAddressList }) => {
  return (
    <div id="addressModalBox">
      <div id="addressModal">
        <div onClick={close} id="addressModalClose">
          <button>X</button>
        </div>
        <Address
          putAddressView={putAddressView}
          allMemberAddressList={allMemberAddressList}
        />
      </div>
    </div>
  );
};

export default AddressModal;
