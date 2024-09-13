
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, push } from 'firebase/database';

export async function POST(request: NextRequest) {
  const { nome, descricao, preco, categoria } = await request.json();
  
  if (!nome || !descricao || !preco || !categoria) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  try {
    const dbRef = ref(database, `produto/${categoria}`);
    await push(dbRef, {nome, descricao, preco, categoria});

    return NextResponse.json({ message: 'Produto criado com sucesso!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao inserir o produto',error: (error as Error).message }, { status: 500 });
  }
}


