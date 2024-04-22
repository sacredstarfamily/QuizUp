import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { QuestionFormDataType } from '../types';

type QuestionFormProps = {
    addNewQuestion: (data: PostFormDataType) => void
}

export default function QuestionForm({ addNewQuestion }: QuestionFormProps) {
    const [newQuestion, setNewQuestion] = useState<QuestionFormDataType>({question: '', answer: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        setNewQuestion({...newQuestion, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewQuestion(newQuestion)
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Post</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>New Question</Form.Label>
                    <Form.Control name='question' placeholder='Enter New Question' value={newQuestion.question} onChange={handleInputChange} />
                    <Form.Label>Question Answer</Form.Label>
                    <Form.Control name='answer' placeholder='Enter New Question Answer' value={newQuestion.answer} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create New Question</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}