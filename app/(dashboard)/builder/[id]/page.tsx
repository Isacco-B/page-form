import { GetformById } from '@/actions/form';
import FormBuilder from '@/components/form-builder';
import React from 'react'

export default async function BuilderPage({params}: {params: {id: string}}) {
  const form = await GetformById(Number(params.id));
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <FormBuilder form={form} />
  )
}
