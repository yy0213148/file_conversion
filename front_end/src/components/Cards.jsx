import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Cards = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
        <Row>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/docx_to_pdf'>
                        <Card.Img 
                            variant='top' 
                            src='images/docx_to_pdf.jpeg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>Word to PDF</Card.Title>
                            <Card.Subtitle>Word to PDF</Card.Subtitle>
                            <Card.Text>Word to PDF.</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/pdf_to_docx'>
                        <Card.Img 
                            variant='top' 
                            src='images/pdf_to_docx.jpeg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>PDF To Word</Card.Title>
                            <Card.Subtitle>PDF To Word</Card.Subtitle>
                            <Card.Text>PDF To Word</Card.Text>
                            
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/image_to_pdf'>
                        <Card.Img 
                            variant='top' 
                            src='images/image_to_pdf.jpg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>Image To PDF</Card.Title>
                            <Card.Subtitle>Image To PDF</Card.Subtitle>
                            <Card.Text>Image To PDF</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/pdf_to_image'>
                        <Card.Img 
                            variant='top' 
                            src='images/docx_to_pdf.jpeg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>PDF To Image</Card.Title>
                            <Card.Subtitle>PDF To Image</Card.Subtitle>
                            <Card.Text>PDF To Image</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/pptx_to_pdf'>
                        <Card.Img 
                            variant='top' 
                            src='images/docx_to_pdf.jpeg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>PPTX To PDF</Card.Title>
                            <Card.Subtitle>PPTX To PDF</Card.Subtitle>
                            <Card.Text>PPTX To PDF</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/pdf_to_pptx'>
                        <Card.Img 
                            variant='top' 
                            src='images/docx_to_pdf.jpeg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>PDF To PPTX</Card.Title>
                            <Card.Subtitle>PDF To PPTX</Card.Subtitle>
                            <Card.Text>PDF To PPTX</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
            <Col md={3} className='mb-3'>
                <Card>
                    <Card.Link as={Link} to='/compress_pdf'>
                        <Card.Img 
                            variant='top' 
                            src='images/compress_pdf.jpg'
                            // className='img-flude mx-auto d-block'
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>Compress Pdf</Card.Title>
                            <Card.Subtitle>Compress Pdf</Card.Subtitle>
                            <Card.Text>Compress Pdf</Card.Text>
                            {/* <div className='d-grid'>
                                <Button variant='danger'>Read More...</Button>
                            </div> */}
                        </Card.Body>
                    </Card.Link>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Cards