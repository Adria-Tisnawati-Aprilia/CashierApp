import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import {faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'

const ModalKeranjang = (
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah, 
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan,
    ) => {
    if(keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}
                    </Modal.Title>
                </Modal.Header>
                    
                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>
                    
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick ={handleClose}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {keranjangDetail.product.nama} {" "}
                    <strong>
                        Rp. {numberWithCommas (keranjangDetail.product.harga)}
                    </strong>
                </Modal.Title>
            </Modal.Header>
                
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput">
                    <Form.Label>Total Harga: </Form.Label>
                    <strong>
                        <p>Rp. {numberWithCommas (totalHarga)}</p>
                    </strong>
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlInput">
                    <Form.Label>Jumlah: </Form.Label>
                    <br />
                    <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                        <strong>{jumlah}</strong>
                    <Button variant="primary" size="sm" className="ml-2" onClick={() => tambah()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Keterangan </Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows="3" 
                    name="keterangan"
                    value={keterangan} 
                    onChange= {(event) => changeHandler(event)}
                />
                
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
                </Form.Group>
                <Modal.Footer>
                    <Button 
                    variant="danger"
                    onClick={() => hapusPesanan(keranjangDetail.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Form>
            </Modal.Body>
        </Modal>
    }
}

export default ModalKeranjang