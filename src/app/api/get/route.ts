// src/app/api/produtos/get.ts
import { NextResponse, NextRequest} from 'next/server';
import { database } from '@lib/firebaseConfig';
import { ref, get } from 'firebase/database';

export async function GET() {
  
  
  try {
    const dbRef = ref(database, 'produto');
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    

    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'Nenhum produto encontrado' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao conectar com o banco de dados', error: (error as Error).message }, { status: 500 });
  }
}

