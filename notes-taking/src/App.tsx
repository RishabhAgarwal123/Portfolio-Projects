import "bootstrap/dist/css/bootstrap.min.css";
import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from "./utils/useLocalStorage";

export type Tag = {
  id: string,
  label: string
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Note = {
  id: string
  & NoteData
}

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type RawNote = {
  id: string,
  title: string,
  markdown: string,
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const noteWithTags = useMemo(() => {
    return notes?.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prev => {
      return [...prev, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }];
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => {
      if (Array.isArray(prev)) {
        return [...prev, tag];
      } else {
        return [tag];
      }
    });
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App