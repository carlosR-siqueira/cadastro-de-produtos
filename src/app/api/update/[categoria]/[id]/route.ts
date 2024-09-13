
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, update } from 'firebase/database';

export async function PUT(request: NextRequest, { params }: { params: { categoria: string, id: string } }) {
    
  const { nome, descricao, preco } = await request.json();
  const { categoria, id } = params
  

  if (!nome || !descricao || !preco || !categoria) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  try {
    const dbRef = ref(database, `produto/${categoria}/${id}`);
    
    const updateData = {
        categoria,
        nome,
        descricao,
        preco,
    }
    
    await update(dbRef , updateData);

    return NextResponse.json({ message: 'Produto criado com sucesso!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao inserir o produto',error: (error as Error).message }, { status: 500 });
  }
}


