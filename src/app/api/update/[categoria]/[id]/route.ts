
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, update } from 'firebase/database';

export async function PUT(request: NextRequest, { params }: { params: { categoria: string, id: string } }) {
    
  const { nome, descricao, preco } = await request.json();
  const { categoria, id } = params
  

  try {
    const dbRef = ref(database, `produto/${categoria}/${id}`);
    
    const updateData = {
        categoria,
        nome,
        descricao,
        preco,
    }
    
    await update(dbRef , updateData);

    return NextResponse.json({ message: 'Produto atualizado com sucesso!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar o produto',error: (error as Error).message }, { status: 500 });
  }
}


