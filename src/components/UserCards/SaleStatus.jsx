import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale';
import { Button, Modal, ModalBody } from 'reactstrap';

function SaleStatus(props) {

    const [status, setStatus] = useState(false)
    // const [form, callForm] = useState(false)

    const getCardStatus = async (id) => {
        await apiHandler.getOneUserCard(id)
        .then((res) => {
            setStatus(res.onSale);
            // console.log(res.onSale)
        })
        .catch(error => console.error(error))
    }

    const openForm = () => {
        toggle()
    }

    const closeForm = () => {
        toggle();
        getCardStatus(props.card._id)
    }

    const cancelAuction = async () => {
        try {
            await apiHandler.deleteAuctionByItem(props.card._id);
            await apiHandler.updateCard(props.card._id, {onSale: false});
            const updatedStatus = await getCardStatus(props.card._id);
            setStatus(updatedStatus.onSale);
            console.log("status", status)
        }
        catch (error) {console.log(error)}
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        getCardStatus(props.card._id)
    })

    return (
        <div>
        {status && 
        <div>
            <p>Card currently up for auction</p>
            <Button onClick={cancelAuction} className="button primary">CANCEL AUCTION</Button>
        </div>}

        {!status && 
        <div>
            <Button onClick={openForm} className="button primary">START AUCTION</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    <FormSale card={props.card} closeForm={closeForm}/>
                </ModalBody>
            </Modal>
        </div>}
        



        
    </div>
    )
}

export default SaleStatus
