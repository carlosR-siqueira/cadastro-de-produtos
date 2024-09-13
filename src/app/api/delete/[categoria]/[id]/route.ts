
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, remove } from 'firebase/database';

export async function DELETE(request: NextRequest, { params }: { params: { categoria: string, id: string } }) {
    
  const { categoria, id } = params

  try {
    
    const dbRef = ref(database, `produto/${categoria}/${id}`);
   
    await remove(dbRef);
  
    return NextResponse.json({ message: 'Produto removido com sucesso!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao remover o produto', error: (error as Error).message }, { status: 500 });
  }
}