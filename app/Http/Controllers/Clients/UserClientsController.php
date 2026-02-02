<?php

namespace App\Http\Controllers\Clients;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Inertia\Inertia;

class UserClientsController extends Controller
{
    public function index()
    {
        $clients = Clients::orderBy('id', 'asc')->get()->map(function ($client) {
            return [
                'id' => $client->id,
                'name' => $client->name,
                'company' => $client->company,
                'avatar' => $client->avatar ? '/storage/' . $client->avatar : '/images/client.jpg',
                'rating' => $client->rating,
                'message' => $client->message,
            ];
        });

        return Inertia::render('comprof/clients', [
            'reviews' => $clients,
        ]);
    }
}
