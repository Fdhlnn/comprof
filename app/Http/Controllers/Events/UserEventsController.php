<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Events;
use Inertia\Inertia;
use Carbon\Carbon;

class UserEventsController extends Controller
{
    public function index()
    {
        $events = Events::orderBy('start_date', 'asc')->get();

        $events = $events->map(function ($event) {
            $start = Carbon::parse($event->start_date);
            $end = Carbon::parse($event->end_date);
            $today = Carbon::today();

            // Tentukan status otomatis
            if ($today->lt($start)) {
                $status = 'upcoming';
            } elseif ($today->between($start, $end)) {
                $status = 'ongoing';
            } else {
                $status = 'past';
            }

            return [
                'id' => $event->id,
                'title' => $event->name,
                'description' => $event->content,
                'date' => $start->format('Y-m-d') . ' – ' . $end->format('Y-m-d'), // tanggal saja
                'location' => $event->location,
                'image' => $event->image ? '/storage/' . $event->image : null,
                'status' => $status,
            ];
        });

        return Inertia::render('comprof/events', [
            'events' => $events,
        ]);
    }
}
