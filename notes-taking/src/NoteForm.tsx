import React from 'react'
import { Col, Form, Row, Stack, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select';

const NoteForm = () => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control required />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId='tags'>
            <Form.Label>Tags</Form.Label>
            <CreatableReactSelect isMulti />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId='markdown'>
        <Form.Label>Body</Form.Label>
        <Form.Control required as='textarea' rows={15} />
      </Form.Group>

      <Stack direction='horizontal' gap={4} style={{marginTop: '20px'}} className='justify-content-end'>
        <Button type='submit' variant='primary'> Save </Button>
        <Button type='button' variant='outline-secondary'>Cancel</Button>
      </Stack>
    </Form>
  )
}

export default NoteForm