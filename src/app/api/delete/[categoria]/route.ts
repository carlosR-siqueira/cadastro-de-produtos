
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, remove } from 'firebase/database';

export async function DELETE(request: NextRequest, { params }: { params: { categoria: string} }) {
    
  const { categoria} = params

  try {
    
    const dbRef = ref(database, `produto/${categoria}`);
   
    await remove(dbRef);
  
    return NextResponse.json({ message: 'Categoria removida com sucesso!' }, { status: 200 });
} catch (error) {
  return NextResponse.json({ message: 'Erro ao remover a categoria', error: (error as Error).message }, { status: 500 });
}
}